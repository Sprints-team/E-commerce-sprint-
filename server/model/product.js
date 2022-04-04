const mongoose = require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId

// schemas
const reviewSchema = new mongoose.Schema({
    userId: ObjectId,
    content: String,
    rating:Number
})




const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true,
        min:1
    },
    describtion: {
        type: String,
        required:true
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max:99
    },
    inStock: {
        type: Number,
        min:1,  
        required:true
    },
    reviews: {
        reviews: [reviewSchema],
        rating: Number,
    },
    images: [String],
    category: {
        categoryId: {
            type: ObjectId,
            index: true,
    },
        categoryName: String
    },
    brand: {
        brandName: String,
        brandId: {
            type: ObjectId,
            index: true
        }
    }
})



// static methods





//the Model

const Product = mongoose.model("product", productSchema)

module.exports= Product

