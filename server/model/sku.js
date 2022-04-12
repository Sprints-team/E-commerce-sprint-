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
  sizes: [{
    size: {
      type: String,
      required:true
    },
    qty: {
      type: Number,
      required:true,
      min:0
    }
  }],
  discount: {
    type: Number,
    default:0
  },
  images: [String],
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