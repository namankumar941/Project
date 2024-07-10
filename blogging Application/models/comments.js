const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    comment: {
        type : String,
        required : true
    },
    createdBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    blogId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "blog"
    },
},{timestamps : true})

const comments = mongoose.model('comments', commentsSchema)

module.exports = comments;