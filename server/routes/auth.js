const express = require("express")
const router = express.Router()
const { PostSignUp,postLogin } = require("../controllers/auth-controller")
const authErrorHandler = require("../middleware/error-handlers/auth-error-handler")
const validator = require("../middleware/error-handlers/validator-middleware")
const signupCompiledSchema= require("../validator/validator-schemas/sign-up-schema")
const loginCompiledSchema= require("../validator/validator-schemas/login-schema")
const confirmPasswordChecker= require("../middleware/error-handlers/confirmPasswordChecker")



// routes
router.post("/signup",validator(signupCompiledSchema),confirmPasswordChecker, PostSignUp)
router.post("/login",validator(loginCompiledSchema),postLogin)




// error handling route must be at the bottom af all routes not to interrupt request
// router.use(authErrorHandler)



module.exports=router