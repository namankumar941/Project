const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({

    shortid: {
        type: String,
        required: true,
        unique: true
    },
    redirecturl: {
        type: String,
        required: true,
    }
},{timeStamps : true})

const url = mongoose.model("url",urlSchema)

module.exports = url;