const express = require("express");
const router = express.Router();
const validator = require("../middleware/validators/validator-middleware");

//ajv schemas
const objectIdCompiledSchema = require("../ajv/validator-schemas/ObjectIdSchema");
const getprodCompliedSchm = require("../ajv/validator-schemas/get-products-schema")
//validator
const validator = require("../middleware/validators/validator-middleware")
//controllers
const{getProduct, getProducts}= require("../controllers/shared-controller")
//routers
router.get("/product/:id",validator(objectIdCompiledSchema,true),getProduct)
router.get("/products",validator(getprodCompliedSchm),getProducts)

module.exports = router;
