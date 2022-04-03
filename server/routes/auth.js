const express = require("express")
const router = express.Router()
const {PostSignUp}=require("../controllers/auth-controller")



// routes
router.post("/signup", PostSignUp)
router.post("/login",)




module.exports=router