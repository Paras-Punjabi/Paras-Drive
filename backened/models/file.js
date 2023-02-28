const mongoose = require("mongoose")
const FileSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mimetype:{
        type:String
    },
    buffer:{
        type:Buffer,
        required:true
    },
    size:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("file",FileSchema)