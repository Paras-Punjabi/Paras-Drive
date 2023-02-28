const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:"Clean Your Space Clean Your Mind"
    },
    date:{
        type:String,
        default:new Date().toDateString()
    }
})

const model = mongoose.model("user",User)
model.createIndexes()

module.exports = model 