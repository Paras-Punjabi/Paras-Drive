const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const validateUser = require("../middleware/validateUser")

router.use(express.json());

//* Login Required in every requests

// Get All Notes using GET Request
router.get("/getallnotes", async (req, res) => {
  const authtoken = req.headers["authtoken"];
  try {
    if (!authtoken) {
      res.status(401).json({ error: "Not allowed", status: false });
      return;
    }

    const { id } = jwt.verify(authtoken, process.env.JWT_SECRET);

    const user = await User.findById(id);
    if (!user) {
      res.status(401).json({ error: "Not allowed", status: false });
      return;
    }

    const notes = await Note.find({ user: user.id });
    res.status(200).json({ notes, status: true });
  } catch (err) {
    res.status(401).json({error:"Please send correct token",status:false})
  }
});

// Create Note using POST request
router.post("/create",validateUser,async(req,res)=>{
    try{
        const {title,description} = req.body
        const user = req.user
        const note = await Note({title,description,user:user.id})
        await note.save()
        res.status(200).json({note,status:true})

    }catch(err){
        res.status(500).json({error:"Internal Server Error",status:false,message:err.message})
    }
})

// Delete a note using DELETE request 
router.delete("/delete",validateUser,async(req,res)=>{
    try{
        const {id} = req.body
        const note = await Note.findByIdAndDelete(id)
        if(note){
            res.status(200).json({note,status:true})
        }else{
            res.status(404).json({error:"Cannot find note",status:false})
        }
    }catch(err){
        res.status(500).json({error:"Internal Server Error",status:false,message:err.message})
    }
})

// Update a note using PUT 
router.put("/update",validateUser,async(req,res)=>{
    try{
        const {newTitle,newDescription,id} = req.body
        const note = await Note.findByIdAndUpdate(id,{
            title:newTitle,
            description:newDescription
        })
        if(note){
            res.status(200).json({note,status:true})
        }else{
            res.status(404).json({error:"Cannot find note",status:false})
        }
    }catch(err){
        res.status(500).json({error:"Internal Server Error",status:false,message:err.message})
    }
})

module.exports = router;
