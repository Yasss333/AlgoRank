//.md preview ctr+shift+v

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "../src/Routes/auth.routes.js";
import probRouter from "../src/Routes/problemManagement.route.js"
import executionRouter from "../src/Routes/execute_coderoutes.js"
import submissionRoute from "../src/Routes/submission_route.js";
import playlistRoute from "../src/Routes/playlistRoute.js"
dotenv.config();
const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  //for everone acces set as "*"
  credentials:true,
}))

app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 5000;

if (!process.env.SECRET) {
  throw new Error("JWT SECRET IS MISSING");
}

app.get("/",(req,res)=>{
  console.log("Hello from AlgoRank ✅ " );
  res.send("Hello from AlgoRank ✅");
 });

 app.use("/api/v1/auth",authRouter);
 app.use("/api/v1/problems",probRouter);
 app.use("/api/v1/execute-route",executionRouter);  
 app.use("/api/v1/submission",submissionRoute)
 app.use("/api/v1/playlist",playlistRoute)

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
