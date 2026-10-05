import { db } from "./db.js";

const EXECUTIONS_PER_WINDOW = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;

export const createExecutionQuota = (database, getNow = () => new Date()) => async (userID) => database.$transaction(async (tx) => {
  await tx.$queryRaw`SELECT "id" FROM "User" WHERE "id" = ${userID} FOR UPDATE`;

  const now = getNow();
  const windowStart = new Date(now.getTime() - WINDOW_MS);
  await tx.executionUsage.deleteMany({
    where: {
      userID,
      createdAt: { lte: windowStart },
    },
  });

  const activeWindow = {
    userID,
    createdAt: {
      gt: windowStart,
      lte: now,
    },
  };
  const usedCount = await tx.executionUsage.count({ where: activeWindow });

  if (usedCount >= EXECUTIONS_PER_WINDOW) {
    const oldestUsage = await tx.executionUsage.findFirst({
      where: activeWindow,
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      select: { createdAt: true },
    });

    return {
      allowed: false,
      retryAt: new Date(oldestUsage.createdAt.getTime() + WINDOW_MS),
    };
  }

  await tx.executionUsage.create({
    data: { userID, createdAt: now },
  });

  return { allowed: true };
});

export const reserveExecution = createExecutionQuota(db);

export const sendQuotaExceeded = (res, retryAt) => res.status(429).json({
  code: "EXECUTION_QUOTA_EXCEEDED",
  message: "You've used all 5 free executions in your current 24-hour window.",
  retryAt: retryAt.toISOString(),
});
