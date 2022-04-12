
const parseJson = (req, res, next) => {
    if (req.body.colors) {
        console.log(req.body.colors)
        try {
            req.body.colors = JSON.parse(req.body.colors);
            return next();
        } catch (err) {
            return res.status(400).json({error:400,msg:"colors field must be of json format"})
        }
    }
    next()
}



module.exports= parseJson