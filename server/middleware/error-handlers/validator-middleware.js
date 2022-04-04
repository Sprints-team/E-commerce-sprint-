
const validator = (ajvValidator) => {
    return (req, res, next) => {
        const valid = ajvValidator(req.body)
        if (!valid) {
            const errors = ajvValidator.errors
            return res.status(400).json({error:"400",errors})
        }
        next()
    }
}


module.exports= validator