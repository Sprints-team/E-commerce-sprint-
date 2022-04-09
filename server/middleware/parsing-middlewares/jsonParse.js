
const parseJson = (req, res, next) => {
    if (req.body.stock) {
        // console.log("json")
        try {
            req.body.stock = JSON.parse(req.body.stock);
            return next();
        } catch (err) {
            return res.status(400).json({error:400,msg:"json field must be of json format"})
        }
    }
    next()
}



module.exports= parseJson