const express = require("express")
const blog = require("../models/blog")
const router = express.Router()
const multer  = require("multer")
const path = require("path");
const Comments = require("../models/comments")

//to render to add blog page
router.get("/add-new",(req,res)=>{
    return res.render('addBlog',{
        user: req.user
    })
})

//middleware to store cover image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve(`./public/uploads`)) 
      },
      filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname 
        return cb(null, uniqueName)
      }
})
const upload = multer({storage})

//to get blog
router.get("/:id", async (req,res)=>{
    // in blog models created by was ref to user so populate will take the object id from user and connect it with blog
    const Blog = await blog.findById(req.params.id).populate("createdBy")
    const allComments =  await Comments.find({ blogId: req.params.id}).populate("createdBy")   
    return res.render("blog",{
        user: req.user,
        blog: Blog,
        comments: allComments
    })
})

//add new blog
router.post("/",upload.single('coverImage'),async (req,res)=>{
    const body = req.body;
    const Blog= await blog.create({
        title: body.title,
        body: body.body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${Blog._id}`)
})

module.exports = router 