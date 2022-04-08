const express = require("express");
const router = express.Router();
const validator = require("../middleware/validators/validator-middleware");
const objectIdCompiledSchema = require("../ajv/validator-schemas/ObjectIdSchema");
const validator=require("../middleware/validators/validator-middleware")
const{getProduct, getProducts}= require("../controllers/shared-controller")

router.get("/product/:id",validator(objectIdCompiledSchema,true),getProduct)
router.get("/products",getProducts)

module.exports = router;
