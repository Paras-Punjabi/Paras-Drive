const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

async function createUser(req,res){
    const User = req.db.collection("user");
    const {name,email,password,bio} = req.body;
    try{
        const getUser = await User.findOne({email})
        console.log(getUser);
        if(getUser){
            res.status(401).json({error:"Please enter unique credentials",status:false})
            return
        }
        const salt = await bcrypt.genSalt(15)
        const securePassword = await bcrypt.hash(password,salt)
        const user = await User.insertOne({name,email,password:securePassword,bio:"Clean Your Space Clean Your Mind",date:new Date().toDateString()})

        const token = jwt.sign({id:user.insertedId.toJSON()},process.env.JWT_SECRET,{algorithm:"HS256"})
        res.json({"authtoken":token,status:true})

    }catch(err){
        res.status(500).send({error:"Internal Server Error",message:err.message,status:false})
    }
}

async function updateUser(req,res){
    const User = req.db.collection("user");
    try{
        const user = req.user
        const {newName,newBio} = req.body
        let data = await User.updateOne({_id:user._id},{
            $set:{
                name:newName,
                bio:newBio
            }
        })
        if(data.acknowledged){
            res.status(200).json({data:{name:newName,bio:newBio},status:true})
        }else{
            res.status(404).json({error:"Cannot find User",status:false})
        }
    }
    catch(err){
        res.status(500).send({error:"Internal Server Error",message:err.message,status:false})
    }
}

async function getUserFromEmailAndPassword(req,res){
    const User = req.db.collection("user");
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(401).json({error:"Please enter correct credentials",status:false})
            return
        }

        let status = await bcrypt.compare(password,user.password)
        if(status){
            const token = jwt.sign({id:user._id.toJSON()},process.env.JWT_SECRET)
            res.status(200).json({"authtoken":token,status:true})
        }
        else{
            res.status(400).json({error:"Please enter correct credentials",status:false})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error:"Internal Server Error",message:err.message,status:false})
    }
}

async function getUserFromJWT(req,res){
    const User = req.db.collection("user");
    try {
        const user = req.user
        if(user){
            res.json({name:user.name,email:user.email,bio:user.bio,date:user.date,status:true})
        }
    } 
    catch (err) {
        res.status(500).send({error:"Internal Server Error",message:err.message,status:false})
    }
}

module.exports = {createUser,updateUser,getUserFromEmailAndPassword,getUserFromJWT}