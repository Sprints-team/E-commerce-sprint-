const express = require("express")
const router = express.Router()
const { addProduct } = require("../controllers/admin-controller")


// router




router.post("/add-product",addProduct)





module.exports=router