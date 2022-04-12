const mongoose = require("mongoose");

//schemas

const categorySchema = new mongoose.Schema({
	title: {
		type: String,
        required: true,
        index:{unique:[true,"this category is taken"]}
    },
    abrv: {
        type: String,
        required:true
    },
    describtion: {
        type: String,
        required:true
    },
    gender: {
        type: String,
        enum: ["MALE","FEMALE","UNISEX"]
    },
    imgUrl: {
        type: String,
        required:true
    }
});


//static methods



// doc methods



//model

const Category = mongoose.model("category", categorySchema)


module.exports= Category
