const express = require("express")
const comments = require("../models/comments")
const router = express.Router()

//add new comments
router.post("/addNew/:blogId",async (req,res)=>{
    const body = req.body;

    const comment= await comments.create({
        comment: body.Comments,
        createdBy: req.user._id,
        blogId: req.params.blogId
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router 