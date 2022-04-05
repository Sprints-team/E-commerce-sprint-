
const validator = (ajvValidator,params=false,query=false) => {
    return (req, res, next) => {
        if (params) {
                const valid = ajvValidator(req.params.id)
                if (!valid) {
                    const errors = ajvValidator.errors
                    return res.status(400).json({error:"400",errors})
            }
         return next()
    }
        const valid = ajvValidator(req.body)
        if (!valid) {
            const errors = ajvValidator.errors
            return res.status(400).json({error:"400",errors})
        }
        next()
    }
}


module.exports= validator