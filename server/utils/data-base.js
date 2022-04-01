const mongoose = require("mongoose")


const connectToDataBase = async(uri,cb) => {
    await mongoose.connect(uri)
    try {
        cb()
    } catch (err) {
        console.log(err)
    }
}

module.exports= connectToDataBase