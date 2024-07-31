const mongoose = require ("mongoose")

const memberSchema = new mongoose.Schema({
    memberId:{
        type: String,
        unique:true
    },
    userId : {
        type: String
    },
    name : {
        type: String,
        required: true,
    },
    age : {
        type: Number,
        required: true
    },
    profileImageURL: {
        type : String,   
        default: '/default.png'    
       },
},{timestamps : true})

const member = mongoose.model("member",memberSchema)

module.exports = member