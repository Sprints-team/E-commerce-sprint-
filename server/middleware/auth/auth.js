const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECTRET_STRING;


class Auth {
	constructor(secret) {
		this.secret = secret;
	}

    extractjsonToken=(headers)=> {
        const authHeader = headers["authorization"];
		const jsonToken = authHeader ? authHeader.split(" ")[1] : false;
        return jsonToken
    }

    authorize (headers) {
        console.log("authorize")
		// extract the jwt from the request headers
        const jsonToken = this.extractjsonToken(headers)
        console.log(jsonToken)
		//no jwt attached
		if (!jsonToken)
			return null

		// verify jwt
        let verifiedUser=null
		jwt.verify(jsonToken, this.secret, (err, user) => {
			console.log(err);
			if (err) return

			//adding the user object to the req
			verifiedUser= user;

        });
        return verifiedUser
    }
    checkIfAdmin = (req, res, next) => {
        // console.log("here")
        const user = this.authorize(req.headers)
        if (!user&&user.role !== 'ADMIN') return res.status(403).json({ error: "403", msg: "user is not authorized to make such an action" })
        next()
    }
    checkIfUser=(req, res, next)=> {
        req.user = this.authorize(req.headers)
        next()
    }
}

const auth=new Auth(secret)

module.exports = auth;
