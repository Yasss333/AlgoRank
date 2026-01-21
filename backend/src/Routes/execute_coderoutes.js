import express from "express";
import { verfiyJWT } from "../Middleware/userverifymiddlware.js";
import  {executionRouter}  from "../Controller/execute_code.js";
const  router=express.Router();



router.post("/",verfiyJWT,executionRouter)  
// router.post("/",executionRouter)  

export default router;  