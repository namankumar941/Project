const express = require("express")
const blog = require("../models/blog")
const router = express.Router()
const multer  = require("multer")
const path = require("path");


router.get("/add-new",(req,res)=>{
    return res.render('addBlog',{
        user: req.user
    })
})

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