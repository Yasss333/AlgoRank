import {db} from "../libs/db.js"

export const createPlaylist= async (req,res) => {
 const {title, description}=req.body;
 const userID=req.user.id;
 try {
    const playlist=await db.playlist.create({
        data:{
            title, description,userID
        }

    })
     return res.status(200).json({
        message:"Playlist Created Successfully",
        playlist:playlist
     })

 } catch (error) {
     console.error(error);
     return res.status(400).json({
        message:"Failed to create playlist ",
        error:error.message
     })    
 }
    
}
export const addProblemInPlaylist= async (req,res) => {
    
}
export const getallproblemsfromPlaylist=async(req,res)=>{
      try {
        const userID=req.user.id;
        const problems=await db.playlist.findMany({
            where:{
                userID
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        });

        return res.status(200).json({
          message:"All details/problems Fetched Successfully",
          problems
        })
      } catch (error) {
        console.error(error);
        return res.status(200).json({
            message:"Failed to get all details ",
            error:error.message
        })
      }
}

export const getplaylistdetailsByPlaylistID=async (req,res) => {
    
}

export const deletePlaylist= async (req,res) => {
    
}
export const removeProblemFromPlaylist= async (req,res) => {
    
}
