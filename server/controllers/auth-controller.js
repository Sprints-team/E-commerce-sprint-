const User = require("../model/user")
const emailValidator = require("email-validator")
const passwordValidator= require("../utils/helpers/password-validator")



exports.PostSignUp = async(req, res) => {
    const { name, email, password, confirmPassword } = req.body
    
    if (!emailValidator.validate(email)) {
        res.status(400).json({error:"the email you entred is not a valid one"})
    }
    if (typeof name.first !== "string" || typeof name.last !== "string") {
        return res.status(400).json({error:"you entered an invalid name"})
    }
    if (!passwordValidator(password)) {
        return res.status(400).json({error:"you entered a weak or invalid password"})
    }
    if (password !== confirmPassword) {
        return res.status(400).json({error:"the confirmed password is not the same as the password"})
    }
    
    const user = new User({
        name: name,
        email: email,
        password: password,
    })
    
    try {
        await user.save()
        return res.status(200).json({msg:"user signed up successfuly successfully"})
    } catch (err) {
        res.status(502).json({msg:"couldn't save user"})
    }
}