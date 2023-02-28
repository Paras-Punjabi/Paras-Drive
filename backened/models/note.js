const mongoose = require("mongoose")

const Note = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }, 
    date:{
        type:String,
        default:new Date()
    }
})

mongoose.model("note",Note)
module.exports = mongoose.model("note",Note)