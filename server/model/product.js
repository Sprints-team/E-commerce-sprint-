const mongoose = require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId

// schemas
const reviewSchema = new mongoose.Schema({
    userId: ObjectId,
    content: String,
    rating:Number
})

const stockSchema = new mongoose.Schema({
    sizes: [{
        size: String,
        colors: [{
            hexColor: {
                type: String,
                required:true
            },
            qty: {
                type: Number,
                required: true,
                min:0
            }
        }]
    }]
})




const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    gender: {
        type: String,
        enum:["MALE","FEMALE"],
        required:true
    },
    ageGroup: {
        type: String,
        enum:["ADULT","CHILD"]
    },
    stock: stockSchema,
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
    reviews: {
        reviews: [reviewSchema],
        rating: {
            type: Number,
            default:0
        },
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


// doc method




//the Model

const Product = mongoose.model("product", productSchema)

module.exports= Product

