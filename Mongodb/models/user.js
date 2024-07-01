const mongoose = require ("mongoose")


// create Schema
const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true  // mandatory entry
    },
    lastname:{
        type: String
    },
    email:{
        type: String,
        require: true,  // mandatory entry
        unique: true    //no 2 entry with same email
    }
},{timestamps: true});  //store time of creation and update of entry


//create Model using schema
const user= mongoose.model("user",userschema);   //user used here same name used by mongo db as collection name ie users



module.exports = user;