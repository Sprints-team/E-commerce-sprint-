const express = require("express")
const { order,getOrders, cancelOrder } = require("../controllers/order")
const { checkIfUser, } = require("../middleware/auth/auth")
const validator = require("../middleware/validators/validator-middleware");
const secret=process.env.SECTRET_STRING
const router = express.Router()
//validation schemas
const orderSchmea=require("../ajv/validator-schemas/order")

// routes ,validate(orderSchmea)
router.post("/order", checkIfUser(secret), order)
router.get("/orders", checkIfUser(secret), getOrders)
router.put("/order",checkIfUser(secret),cancelOrder)





module.exports=router