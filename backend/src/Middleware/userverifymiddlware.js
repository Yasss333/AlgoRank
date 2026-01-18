// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const verfiyJWT = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Token : ", token);
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
     req.user=user;
    next(); 
  } catch (error) {
    console.error(error);
      res.status(400).json({
        message: "JWT middlewared stopped teh execution ",error,
      });
  }
};


export const validateAdmin=(async(req,res,next)=>{
       const userID=req.user.id;
       console.log(userID);
      try {
         const user=await db.user.findUnique({
          where:{
            id:userID
          },
          select:{
            role:true
          }
         })
         if(!user || user.role!=="ADMIN"){
          res.status(403).json({
            message:"Admin only Forbiden -this route is not acesible to you"
          })
          
         }
          // res.status(200).json({
          //   message:"Access GIVEn"
          //  })
          next();
      } catch (error) {
        console.error("Role check ",error)
          res.status(400).json({
            message:"Error valdating role", error
          })
      }
       
})  