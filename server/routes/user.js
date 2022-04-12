const express = require("express")
const { order } = require("../controllers/order")
const { checkIfUser } = require("../middleware/auth/auth")
const secret=process.env.SECTRET_STRING
const router = express.Router()


// routes
router.post("/order",checkIfUser(secret),order)





module.exports=router