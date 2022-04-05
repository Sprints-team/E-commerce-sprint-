const express = require("express")
const router = express.Router()
const { PostSignUp,postLogin } = require("../controllers/auth-controller")
const authErrorHandler = require("../middleware/validators/auth-error-handler")
const validator = require("../middleware/validators/validator-middleware")
const signupCompiledSchema= require("../ejv/validator-schemas/sign-up-schema")
const loginCompiledSchema= require("../ejv/validator-schemas/login-schema")
const confirmPasswordChecker= require("../middleware/validators/confirmPasswordChecker")



// routes
router.post("/signup",validator(signupCompiledSchema),confirmPasswordChecker, PostSignUp)
router.post("/login",validator(loginCompiledSchema),postLogin)




// error handling route must be at the bottom af all routes not to interrupt request
// router.use(authErrorHandler)



module.exports=router