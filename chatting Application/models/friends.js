const mongoose = require("mongoose");

const friendSchema = mongoose.Schema({
    emailID1: {
        type : String,
    },
    emailID2: {
        type : String,
    },
    Status: {
        type : String,
        default: 'pending'
    },
},{timestamps : true});


const friend = mongoose.model("friends",friendSchema);
module.exports = friend;