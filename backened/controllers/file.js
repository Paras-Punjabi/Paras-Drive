const jwt = require("jsonwebtoken")
const {ObjectId} = require("bson")

async function getAllFiles(req,res){
    const User = req.db.collection("user");
    const FileSchema = req.db.collection("file");
    const authtoken = req.headers.authtoken
    if (!authtoken) {
        res.status(401).json({ error: "Not allowed", status: false });
        return;
    }    
    try {
        const { id } = jwt.verify(authtoken, process.env.JWT_SECRET);
        const user = await User.findOne({_id : new ObjectId(id)});
        if (!user) {
            res.status(401).json({ error: "Not allowed", status: false });
            return;
        }
        const files = await FileSchema.find({user:user._id.toJSON()}).toArray()
        let array = files.map(item=>{
            return {...item,buffer:item.buffer.buffer}
        })
        res.status(200).json({status:true,files:array})

    } catch (err) {
        res.status(500).json({error:"Internal Server Error",status:false})
    }
}

async function deleteFile(req,res){
    const User = req.db.collection("user");
    const FileSchema = req.db.collection("file");
    const {fileId} = req.body
    const authtoken = req.headers.authtoken
    if (!authtoken) {
        res.status(401).json({ error: "Not allowed", status: false });
        return;
    }    
    try {
        const { id } = jwt.verify(authtoken, process.env.JWT_SECRET);
        const user = await User.findOne({_id:new ObjectId(id)});
        if (!user) {
            res.status(401).json({ error: "Not allowed", status: false });
            return;
        }
        const file = await FileSchema.deleteOne({_id:new ObjectId(fileId)})
        // console.log(files);
        if(file.acknowledged){
            res.status(200).json({status:true,file:file})
        }
        else{
            res.status(400).json({status:false,error:"File not found"})
        }

    } catch (err) {
        res.status(500).json({error:"Internal Server Error",status:false})
    }
}

async function uploadFiletoDatabase(req,res){
    const User = req.db.collection("user");
    const FileSchema = req.db.collection("file");
    try {
        const files = req.files
        const authtoken = req.body.authtoken

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
        let uploadedFiles = []
        for(let i=0;i<files.length;i++){
            let file = await FileSchema.insertOne({
                user:user._id.toJSON(),
                name:files[i].originalname,
                mimetype:files[i].mimetype,
                buffer:files[i].buffer,
                size:files[i].size
            })
            uploadedFiles.push(await FileSchema.findOne({_id:new ObjectId(file.insertedId)}))
        }
        res.status(200).json({files:uploadedFiles,status:true})

    } catch (err) {
        res.status(500).json({error:"Internal Server Error",status:false})
    }
}

async function getFileById(req,res){
    const User = req.db.collection("user");
    const FileSchema = req.db.collection("file");
    try{
        const {fileId} = req.params
        const authtoken = req.headers.authtoken
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
        const file = await FileSchema.findOne({_id:new ObjectId(fileId)})
        if(file){
            res.json({status:true,file})
        }
        else{
            res.status(404).json({status:false,error:"File not found"})
        }
    }catch(err){
        res.status(500).json({error:"Internal Server Error",status:false,message:err.message})
    }
}

module.exports = {getAllFiles,deleteFile,uploadFiletoDatabase,getFileById}