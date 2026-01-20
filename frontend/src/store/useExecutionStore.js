import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  executeCode: async ({ sourceCode, languageKey, stdin, problemId }) => {
    try {
      set({ isExecuting: true });

      console.log(
        "Piston Submission:",
        JSON.stringify({
          sourceCode,
          languageKey,
          stdin,
          problemId
        })
      );

      const res = await axiosInstance.post("/execute-code", {
        sourceCode,
        languageKey,
        stdin,
        problemId
      });

      set({ submission: res.data.submission });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  }
}));
