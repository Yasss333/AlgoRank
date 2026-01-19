import React ,{useState, useEffect}  from 'react';
import { useParams, Link }  from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";

import { useProblemStore } from '../store/useProblemStore';
import { useToaster } from 'react-hot-toast';

const ProblemPage = () => {
  const {id} =useParams();
  
  const {getProblemById, getAllProblems , getSolvedProblemByUser , problem }=useProblemStore();
  useEffect(()=>{
    getProblemById(id)
  },[id]);
  const[code, setcode]=useState("");
  const[activeTab, setactiveTab]=useState("description");
  const{selectedLanguage, setselectedLanguage}=useState("javascript");
  const[isbookmarked, setIsbookmarked]=useState(false);
  const[testcases, settestcases]=useState([]);

  useEffect(()=>{
    if(problem){
        setcode(problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || "")
  },[problem, selectedLanguage]
     
    }
  console.log(problem);
  

  return (
    <div>Hello  {JSON.stringify(problem)}</div>
  )
}
  )
export default ProblemPage