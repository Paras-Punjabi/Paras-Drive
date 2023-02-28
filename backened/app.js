const express = require("express")
const cors = require("cors")
const PORT = 8000 | process.env.PORT

const userRouter = require("./routes/user");
const noteRouter = require("./routes/note")
const fileRouter = require("./routes/file")
const multer = require("multer")
const uploadFile = multer()

const connectToDataBase = require("./database");
require("dotenv").config()

const app = express()
connectToDataBase()

app.use(express.json())

app.use(cors({
    origin:"*",
    methods:["POST","GET","PUT","DELETE"]
}))

app.use("/api/user",userRouter);
app.use("/api/notes",noteRouter);
app.use("/api/files",fileRouter);


app.get("/",(req,res)=>{
    res.send("<head><title>Paras Drive Server</title></head><body><h1 style='text-align:center;font-family:monospace; font-size:40px;'>Hello from Server of Paras Drive</h1></body>")
})

app.post("/upload",uploadFile.single("file"),(req,res)=>{
    console.log(req.files);
    console.log(req.body);
    res.json({status:"File Uploaded"})
})

app.listen(PORT,()=>{
    console.log("Server Started on " + " http://localhost:" + PORT);
})