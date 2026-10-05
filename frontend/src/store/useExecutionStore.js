import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { getStatusDescription, getErrorMessage } from "../lib/judge0Status";

const showExecutionError = (error, fallbackMessage) => {
  const response = error.response?.data;
  if (error.response?.status === 429 && response?.code === "EXECUTION_QUOTA_EXCEEDED") {
    const retryAt = Date.parse(response.retryAt);
    let renewalDelay = "24 hours";

    if (Number.isFinite(retryAt)) {
      const totalMinutes = Math.max(1, Math.ceil((retryAt - Date.now()) / 60000));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      renewalDelay = hours > 0
        ? `${hours}h ${minutes}m`
        : `${minutes} minute${minutes === 1 ? "" : "s"}`;
    }

    toast.error(`You've used all 5 free executions. Code execution will be available again in ${renewalDelay}, when your quota renews. Developer is Poor rn`);
    return;
  }

  toast.error(response?.error || response?.message || error.message || fallbackMessage);
};

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  //dry run code 
executeCode: async ({ sourceCode, languageKey, stdin }) => {
  try {
    console.log("RUN PAYLOAD:", {
  sourceCode,
  languageKey,
  stdin,
});

    set({ isExecuting: true });

    const res = await api.post("/execute-route/", {
      sourceCode,
      languageKey,
      stdin,
    });

    // Handle Judge0 response format
    const result = res.data.result;
    
    // Provide user-friendly feedback based on status
    if (result.status) {
      const statusDesc = getStatusDescription(result.status.id || result.status);
      if (result.status.id === 3 || result.status.id === 10) {
        toast.success(`Code executed: ${statusDesc}`);
      } else {
        toast.error(`${statusDesc}: ${getErrorMessage(result.status.id)}`);
      }
    } else {
      toast.success("Code executed successfully");
    }

    set({ submission: result });
  } catch (error) {
    console.error("Error executing code", error);
    showExecutionError(error, "Error executing code");
  } finally {
    set({ isExecuting: false });
  }
},

// Submit code to database
submitCode: async ({ sourceCode, languageKey, stdin, problemId, expectedOutputs, testcases }) => {
  try {
    console.log("SUBMIT PAYLOAD:", {
      sourceCode,
      languageKey,
      stdin,
      problemId,
      expectedOutputs,
      testcases,
    });

    set({ isExecuting: true });

    const res = await api.post("/execute-route/submit", {
      sourceCode,
      languageKey,
      stdin,
      problemId,
      expectedOutputs,
      testcases,
    });

    set({ submission: res.data.submission });
    
    // Check if all test cases passed
    const allPassed = res.data.testCaseResults?.every(tc => tc.passed);
    if (allPassed) {
      toast.success("All test cases passed! 🎉");
    } else {
      const passedCount = res.data.testCaseResults?.filter(tc => tc.passed).length || 0;
      const totalCount = res.data.testCaseResults?.length || 0;
      toast.error(`${passedCount}/${totalCount} test cases passed`);
    }
    
    return res.data.submission;
  } catch (error) {
    console.error("Error submitting code", error);
    showExecutionError(error, "Error submitting code");
    throw error;
  } finally {
    set({ isExecuting: false });
  }
}

//modefied submission code 
//   executeCode: async ({ sourceCode, languageKey, stdin, problemId }) => {
//   try {
//     set({ isExecuting: true });

//     // Convert stdin string → array
//     const stdinArray = stdin.split("\n");

//     // Get expected outputs from problem (you already have them)
//     const expected_outputs = []; // TEMP: or map from problem.testcases

//     const res = await axiosInstance.post("/execute-route/", {
//       source_code: sourceCode,
//       langauge_id: languageKey,
//       stdin: stdinArray,
//       expected_outputs,
//       problemID: problemId
//     });

//     set({ submission: res.data.submission });
//     toast.success(res.data.message);
//   } catch (error) {
//     console.error("Error executing code", error);
//     toast.error("Error executing code");
//   } finally {
//     set({ isExecuting: false });
//   }
// }


//OG-code 
  // executeCode: async ({ sourceCode, languageKey, stdin, problemId }) => {
  //   try {
  //     set({ isExecuting: true });

  //     console.log(
  //       "Piston Submission:",
  //       JSON.stringify({
  //         sourceCode,
  //         languageKey,
  //         stdin,
  //         problemId
  //       })
  //     );

  //     const res = await axiosInstance.post("/execute-route/", {
  //       sourceCode,
  //       languageKey,
  //       stdin,
  //       problemId
  //     });

  //     set({ submission: res.data.submission });
  //     toast.success(res.data.message);
  //   } catch (error) {
  //     console.error("Error executing code", error);
  //     toast.error("Error executing code");
  //   } finally {
  //     set({ isExecuting: false });
  //   }
  // }
}));
