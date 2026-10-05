CREATE TABLE "ExecutionUsage" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExecutionUsage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ExecutionUsage_userID_createdAt_idx" ON "ExecutionUsage"("userID", "createdAt");

ALTER TABLE "ExecutionUsage"
ADD CONSTRAINT "ExecutionUsage_userID_fkey"
FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
