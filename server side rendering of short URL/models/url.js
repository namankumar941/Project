const mongoose = require ("mongoose")

const urlschema = new mongoose.Schema({
    shortid : {
        type : String,
        required : true,
        unique : true
    },
    redirecturl: {
        type : String,
        required : true,
    },
    visithistory : [{timestamp: {type: Number}}],

    createdby: {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users"
    }
}, {timestamps : true})

const url= mongoose.model("url",urlschema)

module.exports = url;