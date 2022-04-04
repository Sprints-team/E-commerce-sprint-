const express = require("express")
const router = express.Router()
const { addProduct } = require("../controllers/admin-controller")
const authorizationMiddleware=require("../controllers/authorization-middleware")


// routes

/* all admin routes require authentication and authorization 
so auhentication and authorization middleware mus be added */






router.post("/add-product",addProduct)





module.exports=router