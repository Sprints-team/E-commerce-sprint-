const mongoose = require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId

//schemas
const productInOrderSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        itemPrice: { type: Number, required: true },
        qty: {type:Number, required:true}
    },
    totalPrice: {
        type: Number,
        required:true
    },
    productId: {
        type:ObjectId,
        required:true
    }
    
},{_id:false})


const orderSchema = new mongoose.Schema({
    userId: {
        type:ObjectId,
        required: true,
    },
    products: [productInOrderSchema],
    shippingAdress: {
        country: {
            type: String,
            required:true
        },
        governerate: {
            type: String,
            required:true
        },
        city: {
            type: String,
            required:true
        },
        zipCode: {
            type: Number,
            required:String
        }
    },
    carrier: {
        type: String,
    },
    status: {
        type: String,
        enum: ['PROCESSING', 'WITH_CARRIER', 'ON_THE_WAY', 'DELIVERED'],
        default:"PROCESSING"
    },
    deliveryTime: {
        expected: {
            type: Date,
            required: true,
            default: new Date(+Date.now()+ 4*24*60*60*1000)
        },
        deliveredAt: {
            type: Date,
        },
    }
})


//static methods




// doc methods



//model

const Order = mongoose.model("order", orderSchema)

module.exports= Order