void (async ()=>{
    require("dotenv").config()
    const express = require("express")
    const cors = require("cors")
    const PORT = process.env.PORT ?? 8000

    const userRouter = require("./routes/user");
    const noteRouter = require("./routes/note")
    const fileRouter = require("./routes/file")
    const multer = require("multer")
    const uploadFile = multer()

    const connectToDataBase = require("./database");
    require("dotenv").config()

    const app = express()
    const db = await connectToDataBase()

    app.use(express.json())

    app.use((req,res,next)=>{
        req.db = db
        next()
    })

    app.use(cors());

    app.use("/api/user",userRouter);
    app.use("/api/notes",noteRouter);
    app.use("/api/files",fileRouter);


    app.get("/",(req,res)=>{
        res.send("<head><title>Paras Drive Server</title></head><body style='display:flex;justify-content:center;align-items:center;'><h1 style='text-align:center;font-family:monospace; font-size:80px;'>Hello from Server of Paras Drive</h1></body>")
    })

    app.post("/upload",uploadFile.single("file"),(req,res)=>{
        console.log(req.files);
        console.log(req.body);
        res.json({status:"File Uploaded"})
    })

    app.listen(PORT,()=>{
        console.log("Server Started on " + " http://localhost:" + PORT);
    })

})();
