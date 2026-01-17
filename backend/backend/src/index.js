//.md preview ctr+shift+v

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "../src/Routes/auth.routes.js";
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
  console.log("Hello from AlgoRank ✅ " );
  res.send("Hello from AlgoRank ✅");
 });

 app.use("/api/v1/auth",authRouter);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
