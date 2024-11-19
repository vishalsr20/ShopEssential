const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    pincode:{
        type:String,
        required:true,
        trim:true
    },
    number:{
        type:String,
        required:true,
        trim:true
    },
})

module.exports = mongoose.model("order",orderSchema)