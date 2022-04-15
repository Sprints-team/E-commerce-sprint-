const express = require("express");
const router = express.Router();
//ajv schemas
const objectIdCompiledSchema = require("../ajv/validator-schemas/ObjectIdSchema");
const getprodCompliedSchm = require("../ajv/validator-schemas/get-products-schema")
//validator
const validator = require("../middleware/validators/validator-middleware")
//controllers
const { getProduct, getProducts } = require("../controllers/product");
const { initialData } = require("../controllers/initial-data");
//routers
router.get ("/initial-data",initialData)
router.get("/product/:id",validator(objectIdCompiledSchema,true),getProduct)
router.get("/products", validator(getprodCompliedSchm), getProducts)
module.exports = router;
