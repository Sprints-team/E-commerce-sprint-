const Path = require("path")
const FS=require("fs")
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
},{timestamps:true});


//middleware 
categorySchema.pre("remove", function (next) {
    
    const path = Path.join(Path.parse(__dirname).dir, ...this.imgUrl.split("/"))
    FS.unlink(path, () => {
        console.log("brand image was removd successfuly")
    })
})

//static methods



// doc methods



//model

const Category = mongoose.model("category", categorySchema)


module.exports= Category
