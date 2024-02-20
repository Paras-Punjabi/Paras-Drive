const express = require("express")
const router = express.Router()
const multer = require("multer")
const uploadFile = multer();
const {getAllFiles, deleteFile, getFileById, uploadFiletoDatabase} = require("../controllers/file.js")

router.get("/getfiles",async (req,res)=>{
    await getAllFiles(req,res)
})

router.delete("/delete",async(req,res)=>{
    await deleteFile(req,res);
})

router.post("/upload",uploadFile.array("file",3),async(req,res)=>{
    await uploadFiletoDatabase(req,res);
})

router.get("/:fileId",async(req,res)=>{
    await getFileById(req,res);
})

module.exports = router