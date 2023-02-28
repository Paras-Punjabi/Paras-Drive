const express = require("express")
const router = express.Router()
const User = require("../models/user")
const FileSchema = require("../models/file")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const uploadFile = multer();

router.get("/getfiles",async (req,res)=>{
    const authtoken = req.headers.authtoken
    if (!authtoken) {
        res.status(401).json({ error: "Not allowed", status: false });
        return;
    }    
    try {
        const { id } = jwt.verify(authtoken, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            res.status(401).json({ error: "Not allowed", status: false });
            return;
        }
        const files = await FileSchema.find({user:user._id})
        // console.log(files);
        res.status(200).json({status:true,files:files})

    } catch (err) {
        res.status(500).json({error:"Internal Server Error",status:false})
    }
})

router.delete("/delete",async(req,res)=>{
    const {fileId} = req.body
    const authtoken = req.headers.authtoken
    if (!authtoken) {
        res.status(401).json({ error: "Not allowed", status: false });
        return;
    }    
    try {
        const { id } = jwt.verify(authtoken, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            res.status(401).json({ error: "Not allowed", status: false });
            return;
        }
        const file = await FileSchema.findByIdAndDelete(fileId)
        // console.log(files);
        res.status(200).json({status:true,file:file})

    } catch (err) {
        res.status(500).json({error:"Internal Server Error",status:false})
    }
})


router.post("/upload",uploadFile.array("file",3),async(req,res)=>{
    try {
        const files = req.files
        const authtoken = req.body.authtoken

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
        let uploadedFiles = []
        for(let i=0;i<files.length;i++){
            let file = await FileSchema({
                user:user.id,
                name:files[i].originalname,
                mimetype:files[i].mimetype,
                buffer:files[i].buffer,
                size:files[i].size
            })
            await file.save()
            uploadedFiles.push(file)
        }

        res.status(200).json({files:uploadedFiles,status:true})

    } catch (err) {
        res.status(500).json({error:"Internal Server Error",status:false})
    }
})

router.get("/:fileId",async(req,res)=>{
    try{
        const {fileId} = req.params
        const authtoken = req.headers.authtoken
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
        const file = await FileSchema.findById(fileId)
        res.json({status:true,file})


    }catch(err){
        res.status(500).json({error:"Internal Server Error",status:false,message:err.message})
    }
})

// router.get("/getfiles",(req,res)=>{
    // const authtoken = req.headers.authtoken
    // if (!authtoken) {
    //     res.status(401).json({ error: "Not allowed", status: false });
    //     return;
    // }
    // console.log(authtoken);
    
    // try {
        // const { id } = jwt.verify(authtoken, process.env.JWT_SECRET);
        // const user = await User.findById(id);
        // if (!user) {
        //     res.status(401).json({ error: "Not allowed", status: false });
        //     return;
        // }
        // console.log(authtoken);
        // const files = await FileSchema.find({user:user._id})
        // console.log(files);
        // res.status(200).json({status:true})

    // } catch (err) {
    //     res.status(500).json({error:"Internal Server Error",status:false})
    // }
// })



module.exports = router