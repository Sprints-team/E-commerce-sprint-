
const parseJson = (req, res, next) => {
    if (req.body.json) {
        // console.log("json")
        try {
            req.body = JSON.parse(req.body.json);
            return next();
        } catch (err) {
            return res.status(400).json({error:400,msg:"json field must be of json format"})
        }
    }
    next()
}



module.exports= parseJson