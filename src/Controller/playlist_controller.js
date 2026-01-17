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
export const getallproblemsfromPlaylist=async(req,res)=>{
      
}

export const getplaylistdetailsByPlaylistID=async (req,res) => {
    
}

export const addProblemInPlaylist= async (req,res) => {
    
}
export const deletePlaylist= async (req,res) => {
    
}
export const removeProblemFromPlaylist= async (req,res) => {
    
}
