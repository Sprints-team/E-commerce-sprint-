const mongoose = require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId

//schemas
/* 
-->next step in line is to add a verification prop --> verification through email
*/
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
        index:{unique:true},
        required:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    status: {
        type: String,
        enum:["ACTIVE", "INACTIVE_ACOUNT","SUSPENDED"],
        default:"ACTIVE"
    },
    orders: [{
        orderId: {
            type:ObjectId
        }
    }],
    
})





//static methods



//document methods



// model

const User = mongoose.model('user', userSchema)

module.exports=User


