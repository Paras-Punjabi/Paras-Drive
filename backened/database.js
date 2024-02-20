require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');

// const mongoose = require("mongoose")
// async function connectToDataBase(){
//     const db = await mongoose.connect(process.env.MONGO_URI,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         dbName:"paras-drive"
//     }, () =>{
//         console.log("connected to database")
//     })
// }

async function connectToDataBase() {
    const uri = process.env.MONGO_URI
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();
    console.log("Connected to Database");
    return client.db("paras-drive")
}
module.exports = connectToDataBase