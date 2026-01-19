import {create }  from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";
import { get } from "react-hook-form";
// import axios from "axios";

export const useProblemStore=create((set)=>({
    problem:null,
    problems:[],
    solvedProblems:[],
    isProblemLoading :false ,
    isProblemsLoading :false,

    getAllProblems:async()=>{
        try {
            set({isProblemsLoading:true})
            
            const res= await axiosInstance.get("/problems/get-all-problems");
            
            set({problems:res.data.problems})
        } catch (error) {
            console.log("Error getting all problems ", error);
            toast.error("Failed Getting ALl problems")
        }
        finally{
            set({isProblemsLoading:false})
            
        }
    },
    getProblemById:async(id)=>{
        try {
            set({isProblemLoading:true})
            const res=await axiosInstance.get(`/problems/get-problem/${id}`)
            set({problem:res.data.problem});
            toast.success("Success in getting the problem ")
        } catch (error) {
            console.log("Error in getting this problem", error);
            toast.error("Failed to get the problem ")
        }
        finally{
            set({isProblemLoading:false})
        }
    },
    getSolvedProblemByUser:async()=>{
        try {
            set({isProblemsLoading:true})
            const res=await axiosInstance.get("/problems/get-solved-problem");
            set({problems:res.data.problems})
        } catch (error) {
            console.log("Error in loading the problems solved by the user ", error);
            toast.error("Failed to get problems solved by you ")
            
        }
        finally{
            set({isProblemsLoading:false})
        }
    },
}))
