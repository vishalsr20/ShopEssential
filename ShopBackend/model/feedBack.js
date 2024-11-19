const mongoose = require("mongoose")

const feedBackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        Unique:true
    },
    subject:{
        type:String,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true,
        trim:true        
    }
})
module.exports = mongoose.model("feedBack",feedBackSchema)