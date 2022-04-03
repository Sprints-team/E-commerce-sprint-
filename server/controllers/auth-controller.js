const User = require("../model/user")




exports.PostSignUp = async(req, res,next) => {
    const { name, email, password, confirmPassword } = req.body
    
    const user = new User({
        name: name,
        email: email,
        password: password,
        confirmPassword:confirmPassword
    })
    
    try {
        await user.save()
        return res.status(200).json({msg:"user signed up successfuly successfully"})
    } catch (err) {
        next(err,req,res,next)
    }
}


/* json web token is created here and sent to the client */
exports.postLogin = async(req, res) => {
    const { email, password } = req.body
    
}