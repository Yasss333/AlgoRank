import express from "express";
import { verfiyJWT } from "../Middleware/userverifymiddlware.js";
import  {executionRouter, submitCodeHandler}  from "../Controller/execute_code.js";
const  router=express.Router();



router.post("/",verfiyJWT,executionRouter)
router.post("/submit",verfiyJWT,submitCodeHandler)  
// router.post("/",executionRouter)  

export default router;  