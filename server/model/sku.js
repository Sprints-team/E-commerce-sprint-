const mongoose = require("mongoose");
const Index = require("./sku-index");
const ObjectId = mongoose.Schema.Types.ObjectId


//sku: categoryCode-..size:s,m,l..||35-50-color:hexString- sequence:...

const schema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    index:{unique:true}
  },
  sizes: {},
  discount: {
    type: Number,
    default:0
  },
  images: [String],
  price: {
    type: Number,
    required:true
  },
  productId: {
    type: ObjectId,
    ref:"product"
  }
})


//middleware
schema.pre("save", async function (next) {
 try{ const index = await Index.autoIncrement()
  this.sku = `${this.sku}${index}`
   next()
 } catch (err) {
   next(err)
  }
})

const SKU = mongoose.model("sku", schema)

module.exports=SKU