const express = require("express")
const router = express.Router()
const { addProduct } = require("../controllers/admin-controller")
const producCompiledSchema = require("../validator/validator-schemas/product-schema")
const multer = require("multer")
const upload = multer({ dest: "./public/uploads" })
const validator=require("../middleware/error-handlers/validator-middleware") 


// router




router.post("/add-product",upload.array("file"),validator(producCompiledSchema),addProduct)





module.exports=router