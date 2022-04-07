const mongoose = require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId


// schemas
const brandSchema = new mongoose.Schema({
    title: {
		type: String,
		required:true,
    },
    describtion: {
        type: String,
        required:true
    },
    manufacturer: {
        type: String,
        required:true
    }
})



//static methods



// doc methods


// model 
const Brand= mongoose.model('brand',brandSchema)