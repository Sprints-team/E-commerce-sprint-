const express = require("express")
const router = express.Router()

// controllers
const { order,getOrders, cancelOrder } = require("../controllers/order")
const { checkIfUser, } = require("../middleware/auth/auth")
const { updateStatus } = require("../controllers/user");
//secret
const secret=process.env.SECTRET_STRING
//validation schemas
const validator = require("../middleware/validators/validator-middleware");
const orderSchmea = require("../ajv/validator-schemas/order")
const getOrdersSchema= require("../ajv/validator-schemas/get-order");
const statuschmea= require("../ajv/validator-schemas/status");
const ObjectIdSchema = require("../ajv/validator-schemas/ObjectIdSchema");




// routes ,validate(orderSchmea)
router.post("/order",validator(orderSchmea), checkIfUser(secret), order)
router.get("/orders",validator(getOrdersSchema), checkIfUser(secret), getOrders)
router.put("/order", validator(ObjectIdSchema),checkIfUser(secret), cancelOrder)
router.put("/deactivate",checkIfUser(secret),updateStatus("INACTIVE_ACOUNT"))





module.exports=router