import {create }  from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";
import { get } from "react-hook-form";

export const useProblemStore=async ((set)=({
    problem:[],
    problems:[],
    isProblemLoading :false ,
    isProblemsLoading :false,
    solvedProblems:[],

    getAllProblems:async()={},
    getProblemById:async()={},
    getSolvedProblemByUser:async()={},
}))
