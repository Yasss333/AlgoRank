import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Terminal
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  if (!submission) return null;

  /* ---------------------------
     Normalize incoming data
  ---------------------------- */

  const testCases = Array.isArray(submission.testCases)
    ? submission.testCases
    : [];

  const hasTestCases = testCases.length > 0;

  const status = submission.status || "Executed";
  const stdout = submission.stdout || "";
  const stderr = submission.stderr || "";

  /* ---------------------------
     Memory & Time (Judge-style)
     Safe parsing
  ---------------------------- */

  const memoryArr = (() => {
    try {
      return JSON.parse(submission.memory || "[]");
    } catch {
      return [];
    }
  })();

  const timeArr = (() => {
    try {
      return JSON.parse(submission.time || "[]");
    } catch {
      return [];
    }
  })();

  const avgMemory =
    memoryArr.length > 0
      ? memoryArr.map(m => parseFloat(m)).reduce((a, b) => a + b, 0) /
        memoryArr.length
      : null;

  const avgTime =
    timeArr.length > 0
      ? timeArr.map(t => parseFloat(t)).reduce((a, b) => a + b, 0) /
        timeArr.length
      : null;

  const successRate = hasTestCases
    ? ((testCases.filter(tc => tc.passed).length / testCases.length) * 100)
    : 100;

  /* ---------------------------
     UI
  ---------------------------- */

  return (
    <div className="space-y-6">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm">Status</h3>
            <div
              className={`text-lg font-bold ${
                status === "Accepted" ? "text-success" : "text-warning"
              }`}
            >
              {status}
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm">Success Rate</h3>
            <div className="text-lg font-bold">
              {successRate.toFixed(1)} %
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Avg. Runtime
            </h3>
            <div className="text-lg font-bold">
              {avgTime !== null ? `${avgTime.toFixed(3)} s` : "N/A"}
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm flex items-center gap-2">
              <Memory className="w-4 h-4" />
              Avg. Memory
            </h3>
            <div className="text-lg font-bold">
              {avgMemory !== null ? `${avgMemory.toFixed(0)} KB` : "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------
          RUN CODE (PISTON)
      ---------------------------- */}
      {!hasTestCases && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Program Output
            </h2>

            <div className="bg-base-200 rounded-lg p-4 font-mono whitespace-pre-wrap">
              {stdout || "No output"}
            </div>

            {stderr && (
              <div className="mt-4">
                <p className="text-error font-semibold">Error:</p>
                <pre className="bg-error/10 p-3 rounded-lg text-error">
                  {stderr}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------
          SUBMIT (JUDGE STYLE)
      ---------------------------- */}
      {hasTestCases && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Test Case Results</h2>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Expected</th>
                    <th>Your Output</th>
                    <th>Memory</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {testCases.map((tc, idx) => (
                    <tr key={idx}>
                      <td>
                        {tc.passed ? (
                          <span className="flex items-center gap-2 text-success">
                            <CheckCircle2 className="w-4 h-4" />
                            Passed
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-error">
                            <XCircle className="w-4 h-4" />
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="font-mono">{tc.expected}</td>
                      <td className="font-mono">{tc.stdout ?? "null"}</td>
                      <td>{tc.memory || "N/A"}</td>
                      <td>{tc.time || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionResults;
