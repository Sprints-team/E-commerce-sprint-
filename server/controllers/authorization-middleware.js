const jwt=require("jsonwebtoken")

const secret= process.env.SECTRET_STRING


const authorizationMiddleware = (req, res, next) => {
    // extract the jwt from the request headers 
    const authHeader = req.headers['authorization']
    const jsonToken = authHeader ? authHeader.split(" ")[1] : false
    
    //no jwt attached
    if (!jsonToken) return res.status(401).json({error:"401", msg:"user is not authorized"})
    
    // verify jwt
    jwt.verify(jsonToken, secret, (err, user) => {
        if(err) return res.status(403).json({error:"403",msg:"user doesn't have the authorization to perform that action"})

    //adding the user object to the req 
    req.user = user
        
        next()
    })
}



module.exports= authorizationMiddleware