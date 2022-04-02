const mongoose = require("mongoose")
const mongodb = require("mongodb")

//schemas
const userSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required:true
        },
        last: {
            type: String,
            required:true
        },
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    suspended: {
        type:boolean
    }
})