const express = require("express")
const router = express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validateUser = require("../middleware/validateUser")

//* POST request to create user
router.post("/create",async (req,res)=>{
    const {name,email,password,bio} = req.body;
    try{
        const getUser = await User.findOne({email})
        if(getUser){
            res.status(401).json({error:"Please enter unique credentials",status:false})
            return
        }
        const salt = await bcrypt.genSalt(15)
        const securePassword = await bcrypt.hash(password,salt)
        const user = await User({name,email,password:securePassword,bio})
        await user.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{algorithm:"HS256"})
        res.json({"authtoken":token,status:true})

    }catch(err){
        res.status(500).send({error:"Internal Server Error",message:err.message,status:false})
    }
})

router.put("/update",validateUser,async(req,res)=>{
    try{
        const user = req.user
        const {newName,newBio} = req.body
        let data = await User.findByIdAndUpdate(user._id,{name:newName,bio:newBio})
        if(data){
            res.status(200).json({data:{name:data.name,bio:data.bio},status:true})
        }else{
            res.status(404).json({error:"Cannot find User",status:false})
        }
    }catch(err){
        res.status(500).send({error:"Internal Server Error",message:err.message,status:false})
    }

})

//*POST request to get user data through email and password
router.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(401).json({error:"Please enter correct credentials",status:false})
            return
        }

        let status = await bcrypt.compare(password,user.password)
        if(status){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.status(200).json({"authtoken":token,status:true})
        }
        else{
            res.status(400).json({error:"Please enter correct credentials",status:false})
        }
    } catch (err) {
        res.status(500).send({error:"Internal Server Error",message:err.message,status:false})
    }
})

//*POST request to get user data through JWT in headers
router.get("/get",validateUser,async (req,res)=>{
    try {
       const user = req.user
       if(user){
        res.json({name:user.name,email:user.email,bio:user.bio,date:user.date,status:true})
       }
    } catch (err) {
        res.status(500).send({error:"Internal Server Error",message:err.message,status:false})
    }
})

module.exports = router