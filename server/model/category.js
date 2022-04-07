const mongoose = require("mongoose");

//schemas

const categorySchema = new mongoose.Schema({
	title: {
		type: String,
        required: true,
        index:{unique:true}
    },
    describtion: {
        type: String,
        required:true
    },
});


//static methods



// doc methods



//model

const Category = mongoose.model("category", categorySchema)


module.exports= Category
