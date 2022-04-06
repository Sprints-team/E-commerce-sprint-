const mongoose = require("mongoose")


// schemas
const brandSchema = new mongoose.Schema({
    title: {
		type: String,
        required: true,
        unique:true
    },
    describtion: {
        type: String,
        required:true
    },
    logo: {
        type: "string",
        required: true
    }
})



//static methods



// doc methods


// model 
const Brand = mongoose.model('brand', brandSchema)


module.exports= Brand