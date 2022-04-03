const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const User = require("../model/user")

const secret=process.env.SECTRET_STRING




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
    const user = await User.findOne({ email: email })
    
    try {
        
        //validate hashed  password
        const validPassword= await bcrypt.compare(password,user.password)

        //wrong password
        if (!validPassword) return res.status(403).json({ error: "403", msg: "user entered a wrong password" })

        const token = jwt.sign({ userName: user.name, role: user.role, email: user.email }, secret)
        res.status(200).json({
            jsonToken: token, user: {
                email: user.email,
                name: user.name
                // -->we can add a user image url
        }})
    } catch (err) {
        console.log(err)
    }
}