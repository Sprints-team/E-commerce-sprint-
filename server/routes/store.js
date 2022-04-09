const express = require("express");
const router = express.Router();
//ajv schemas
const objectIdCompiledSchema = require("../ajv/validator-schemas/ObjectIdSchema");
const getprodCompliedSchm = require("../ajv/validator-schemas/get-products-schema")
//validator
const validator = require("../middleware/validators/validator-middleware")
//controllers
const { getProduct, getProducts } = require("../controllers/product")
//routers
router.get("/product/:id",validator(objectIdCompiledSchema,true),getProduct)
router.get("/products", validator(getprodCompliedSchm), getProducts)
router.get

module.exports = router;
