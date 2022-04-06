
const parseJson = (req, res, next) => {
    if (req.body.json) {
        req.body = JSON.parse(req.body.json);
        try {
            return next();
        } catch (err) {
            res.status(400).json({error:400,msg:"json field must be of json format"})
        }
    }
    next()
}



module.exports= parseJson