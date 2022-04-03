const emailValidator=require("email-validator")
const passwordValidator = require("./password-validator")

const signUpValidator = (email,password,confirmPassword,name) => {
     
    if (!emailValidator.validate(email)) {
        return {
            sts: 400,
            msg:"the email you entred is not a valid one"
        }
    }
    if (typeof name.first !== "string" || typeof name.last !== "string") {
        return {
            sts: 400,
            msg:"you entered an invalid name"
        }
    }
    if (!passwordValidator(password)) {
        return {
            sts: 400,
            msg:"you entered a weak or invalid password"
        }
    }
    if (password !== confirmPassword) {
        return {
            sts: 400,
            msg:"the confirmed password is not the same as the password"
        }
    }
    return false
}


module.exports=signUpValidator