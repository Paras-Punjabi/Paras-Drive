const User = require("../models/user")
const jwt = require("jsonwebtoken")

async function validateUser(req,res,next){
    const {authtoken} = req.headers
    try {    
        if(!authtoken){
            res.status(401).json({error:"Please enter correct credentials",status:false})
            return
        }
        else{
            let {id} = jwt.verify(authtoken,process.env.JWT_SECRET)
            const user = await User.findById(id)
            if(!user){
                res.status(401).json({error:"Please enter correct credentials",status:false})
                return
            }
            req.user = user
        }
    } catch (err) {
        res.status(500).json({error:"Please send correct token",status:false})
        return
    }
    next()
}

module.exports = validateUser