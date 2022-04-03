const express = require("express")
const router = express.Router()
const { addProduct } = require("../controllers/admin-controller")
const authorizationMiddleware=require("../controllers/authorization-middleware")


// routes

/* all admin routes require authentication and authorization 
so auhentication and authorization middleware mus be added */


//checks for jwt 
router.use(authorizationMiddleware)

//checks for user role

router.use((req, res, next) => {
    const user = req.user
    
    if (user.role !== 'ADMIN') return res.status(403).json({ error: "403", msg: "user is not authorized to make such an action" })
    next()
})


router.post("/add-product",addProduct)





module.exports=router