import assert from "node:assert/strict";
import test from "node:test";
import { createExecutionQuota } from "../src/libs/executionQuota.js";

const WINDOW_MS = 24 * 60 * 60 * 1000;

const createFakeDatabase = () => {
  const usages = [];
  let transactionQueue = Promise.resolve();

  return {
    usages,
    async $transaction(callback) {
      let release;
      const currentTransaction = new Promise((resolve) => {
        release = resolve;
      });
      const previousTransaction = transactionQueue;
      transactionQueue = previousTransaction.then(() => currentTransaction);
      await previousTransaction;

      try {
        return await callback({
          async $queryRaw() {
            return [];
          },
          executionUsage: {
            async deleteMany({ where }) {
              const previousLength = usages.length;
              for (let index = usages.length - 1; index >= 0; index -= 1) {
                const usage = usages[index];
                if (usage.userID === where.userID && usage.createdAt <= where.createdAt.lte) {
                  usages.splice(index, 1);
                }
              }
              return { count: previousLength - usages.length };
            },
            async count({ where }) {
              return usages.filter((usage) =>
                usage.userID === where.userID &&
                usage.createdAt > where.createdAt.gt &&
                usage.createdAt <= where.createdAt.lte
              ).length;
            },
            async findFirst({ where, orderBy }) {
              return usages
                .filter((usage) =>
                  usage.userID === where.userID &&
                  usage.createdAt > where.createdAt.gt &&
                  usage.createdAt <= where.createdAt.lte
                )
                .sort((first, second) =>
                  first.createdAt - second.createdAt ||
                  (orderBy[1].id === "asc" ? first.id.localeCompare(second.id) : 0)
                )[0] ?? null;
            },
            async create({ data }) {
              const usage = { ...data, id: `usage-${usages.length}` };
              usages.push(usage);
              return usage;
            },
          },
        });
      } finally {
        release();
      }
    },
  };
};

test("allows five executions and returns the first usage's renewal time on the sixth", async () => {
  const database = createFakeDatabase();
  let now = new Date("2026-10-05T12:00:00.000Z");
  const reserveExecution = createExecutionQuota(database, () => new Date(now));

  for (let execution = 0; execution < 5; execution += 1) {
    assert.deepEqual(await reserveExecution("user-1"), { allowed: true });
    now = new Date(now.getTime() + 1000);
  }

  const firstUsage = database.usages[0].createdAt;
  const result = await reserveExecution("user-1");

  assert.deepEqual(result, {
    allowed: false,
    retryAt: new Date(firstUsage.getTime() + WINDOW_MS),
  });
  assert.equal(database.usages.length, 5);
});

test("removes expired usage and allows a renewed execution", async () => {
  const database = createFakeDatabase();
  const now = new Date("2026-10-05T12:00:00.000Z");
  database.usages.push({
    id: "expired-usage",
    userID: "user-1",
    createdAt: new Date(now.getTime() - WINDOW_MS),
  });

  const reserveExecution = createExecutionQuota(database, () => now);

  assert.deepEqual(await reserveExecution("user-1"), { allowed: true });
  assert.equal(database.usages.length, 1);
  assert.equal(database.usages[0].createdAt.getTime(), now.getTime());
});

test("serializes concurrent reservations so the quota cannot be exceeded", async () => {
  const database = createFakeDatabase();
  const now = new Date("2026-10-05T12:00:00.000Z");
  const reserveExecution = createExecutionQuota(database, () => now);

  const results = await Promise.all(
    Array.from({ length: 8 }, () => reserveExecution("user-1"))
  );

  assert.equal(results.filter((result) => result.allowed).length, 5);
  assert.equal(results.filter((result) => !result.allowed).length, 3);
  assert.equal(database.usages.length, 5);
});
