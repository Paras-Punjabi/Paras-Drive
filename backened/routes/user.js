const express = require("express")
const router = express.Router()
const validateUser = require("../middleware/validateUser")
const { createUser, updateUser, getUserFromEmailAndPassword, getUserFromJWT } = require("../controllers/user")

//* POST request to create user
router.post("/create",async (req,res)=>{
    await createUser(req,res);
})

router.put("/update",validateUser,async(req,res)=>{
    await updateUser(req,res);
})

//*POST request to get user data through email and password
router.post("/login",async (req,res)=>{
    await getUserFromEmailAndPassword(req,res);
})

//*POST request to get user data through JWT in headers
router.get("/get",validateUser,async (req,res)=>{
    await getUserFromJWT(req,res);
})

module.exports = router