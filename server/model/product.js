const mongoose = require("mongoose")
const mongodb=require("mongodb")

// schemas
const reviewSchema = new mongoose.Schema({
    userId: mongodb.ObjectId,
    content:String
})




const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    discount: {
        applicable: Boolean,
        percentage: Number
    },
    inStock: {
        type: Number,
        required:true
    },
    reviews: [reviewSchema],
    images: [String],
    category:{categoryId: {
        type: mongodb.ObjectId,
        index: true,
    },
    categoryName: String},
    brand: {
        brandName: String,
        brandId: {
            type: mongodb.ObjectId,
            index: true
        }
    }
})



// static methods





//the Model

const Product = mongoose.model("user", productSchema)

module.exports= Product

