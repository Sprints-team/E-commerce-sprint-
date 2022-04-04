const confirmPasswordChecker = (req,res,next) => {
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        return res.status(400).json({error:"400",msg:"confirmed password is not the same as password"})
    }
    next()
}

module.exports= confirmPasswordChecker