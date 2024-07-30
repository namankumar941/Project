const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
    userId : {
        type: String
    },
    email : {
        type: String,
        unique: true
    },
    name : {
        type: String,
        required: true,
    },
    age : {
        type: Number,
    },
    phoneNumber : {
        type: Number,
    },
    profileImageURL: {
        type : String,    
       },
},{timestamps : true})

const user = mongoose.model("user",userSchema)

module.exports = user