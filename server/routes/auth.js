const express = require("express")
const router = express.Router()
const { PostSignUp,postLogin } = require("../controllers/auth-controller")
const authErrorHandler=require("../controllers/error-handlers/auth-error-handler")




// routes
router.post("/signup", PostSignUp)
router.post("/login",postLogin)




// error handling route must be at the bottom af all routes not to interrupt request
router.use(authErrorHandler)



module.exports=router