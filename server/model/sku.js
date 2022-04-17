const mongoose = require("mongoose");
const Index = require("./sku-index");
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		ref: "user",
	},
	content: String,
	rating: Number,
});


//sku: categoryCode-..size:s,m,l..||35-50-color:hexString- sequence:...

const schema = new mongoose.Schema({
  title: {
    type:String
  },
  sku: {
    type: String,
    required: true,
    index:{unique:true}
  },
  sizes: {},
  images: [String],
  price: {
    type: Number,
    required:true
  },
  productId: {
    type: ObjectId,
    ref:"product"
  },
  soldItems: {
    type: Number,
    min: 0,
    default:0
  }
})


// middleware
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