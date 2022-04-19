const Path = require("path")
const FS=require("fs")
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
},{timestamps:true})

//middleWare

brandSchema.pre("remove", async function (next) {
    const path = Path.join(Path.parse(__dirname).dir, ...this.logo.split("/"))
    
    FS.unlink(path, () => {
        console.log("logo deleted successully")
    })
    next()
})


//static methods



// doc methods


// model 
const Brand = mongoose.model('brand', brandSchema)


module.exports= Brand