const mongoose = require("mongoose")
require("dotenv").config()

async function connectToDataBase(){
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DataBase");
}

module.exports = connectToDataBase