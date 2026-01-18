import React from 'react'
import {useForm, useFieldArray, Controller} from "react-hook-form"
import {z} from "zod";
import {
Plus, Trash2, Code2, FileText, Lightbulb, BookOpen, CheckCircle, Download
} from "lucide-react";
import Editor from "@monaco-editor/react";
import {useState} from "react";
import { axiosInstance } from '../lib/axios.js';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const problemSchema=z.object({
    title:z.string().min(3, "Title should contain min 3 characters"),
    description:z.string().min(10, "Title should contain min 10 characters"),
    difficulty:z.enum(["EASY", "HARD", "MEDIUM"]),
    tags:z.array(z.string().min(1,"Atleast one tag required")),
    constraints:z.string(z.min(1, "Atleast  1 constraint required ")),
    hints:z.string().optional(),
    editorial:z.string().optional(),
    testcases:z.array(
        z.object({
            input :z.string().min(1, "Input should have atleast 1 "),
            output :z.string().min(1, "Input should have atleast 1 ")
        })
    ).min(1, "Atleast 1 testcase is required bro kya kya kar rha hai"),
    examples:z.object({
        JAVASCRIPT:z.object({
            input:z.string().min(1, "Input should have atleast 1"),
            output:z.string().min(1, "output should have atleast 1"),
            explanation:z.string().optional()
        }),
        PYTHON:z.object({
            input:z.string().min(1, "Input should have atleast 1"),
            output:z.string().min(1, "output should have atleast 1"),
            explanation:z.string().optional()
        }),
        JAVA:z.object({
            input:z.string().min(1, "Input should have atleast 1"),
            output:z.string().min(1, "output should have atleast 1"),
            explanation:z.string().optional()
        })
    }),
     codeSnippet:z.object({
        JAVASCRIPT:z.string().min(1,"Atleast ek Snippet to provide karo bhai "),
        PYTHON:z.string().min(1,"Atleast ek Snippet to provide karo bhai "),
        JAVA:z.string().min(1,"Atleast ek  Snippet to provide karo bhai ")
     }),
     refrenceSolutions:z.object({
        JAVASCRIPT:z.string().min(1,"Atleast ek RefrenceSoln to provide karo bhai "),
        PYTHON:z.string().min(1,"Atleast ek RefrenceSoln to provide karo bhai "),
        JAVA:z.string().min(1,"Atleast ek  RefrenceSoln to provide karo bhai ")
     })  
})

const CreateProblemForm = () => {
  return (
    <div>CreateProblemForm</div>
  )
}

export default CreateProblemForm