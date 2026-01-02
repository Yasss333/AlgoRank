// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const verfiyJWT = async (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log("Token : ", token);
  let decoded;
  try {
    decoded = await jwt.verify(token , process.env.SECRET);
    if (!decoded) {
      res.status(400).json({
        message: "Wrong credentials",
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select:{
        id:true,
        name:true,
        password:false,        
      }
    });
    if(!user){
        res.status(400).json({
          message: "Wrong credentials",
        });
    }

    next(); 
  } catch (error) {
    console.error(error);
      res.status(400).json({
        message: "JWT middlewared stopped teh execution ",error,
      });
  }
};
