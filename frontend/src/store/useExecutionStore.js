import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  //dry run code 
executeCode: async ({ sourceCode, languageKey, stdin }) => {
  try {
    set({ isExecuting: true });

    const res = await axiosInstance.post("/execute-route", {
      sourceCode,
      languageKey,
      stdin,
    });

    set({ submission: res.data.result });
    toast.success("Code executed successfully");
  } catch (error) {
    console.error("Error executing code", error);
    toast.error("Error executing code");
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
