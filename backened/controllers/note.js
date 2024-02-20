require("dotenv").config()
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");

async function getAllNotes(req,res){
    const User = req.db.collection("user");
    const Note = req.db.collection("note");
    const authtoken = req.headers["authtoken"];
    try {
        if (!authtoken) {
            res.status(401).json({ error: "Not allowed", status: false });
            return;
        }
        const { id } = jwt.verify(authtoken, process.env.JWT_SECRET);

        const user = await User.findOne({_id:new ObjectId(id)});
        if (!user) {
            res.status(401).json({ error: "Not allowed", status: false });
            return;
        }
        const notes = await Note.find({user: user._id.toJSON()}).toArray()
        res.status(200).json({ notes, status: true });
    } 
    catch (err) {
        res.status(401).json({error:"Please send correct token",status:false})
    }
}

async function createNote(req,res){
    const User = req.db.collection("user");
    const Note = req.db.collection("note");
    try{
        const {title,description} = req.body
        const date = new Date()
        const user = req.user
        const note = await Note.insertOne({title,description,date,user:user._id.toJSON()})
        if(note.acknowledged){
            res.status(200).json({note:{"_id":note.insertedId,title,description,date},status:true})
        }

    }catch(err){
        res.status(500).json({error:"Internal Server Error",status:false,message:err.message})
    }
}

async function deleteNote(req,res){
    const User = req.db.collection("user");
    const Note = req.db.collection("note");
    try{
        const {id} = req.body
        const note = await Note.deleteOne({_id:new ObjectId(id)});
        if(note.acknowledged){
            res.status(200).json({note,status:true})
        }else{
            res.status(404).json({error:"Cannot find note",status:false})
        }
    }catch(err){
        res.status(500).json({error:"Internal Server Error",status:false,message:err.message})
    }
}

async function updateNote(req,res){
    const User = req.db.collection("user");
    const Note = req.db.collection("note");
    try{
        const {newTitle,newDescription,id} = req.body
        const note = await Note.updateOne({_id:new ObjectId(id)},{
            $set:{
                title:newTitle,
                description:newDescription
            }
        })
        if(note.acknowledged){
            res.status(200).json({note,status:true})
        }else{
            res.status(404).json({error:"Cannot find note",status:false})
        }
    }catch(err){
        res.status(500).json({error:"Internal Server Error",status:false,message:err.message})
    }
}

module.exports = {getAllNotes,createNote,deleteNote,updateNote}