const express = require("express")
const User = require("../models/user")
const  {createToken,validateToken} = require("../service/auth")
const multer  = require("multer")
const path = require("path");
const { createHmac } = require('node:crypto');


const router = express.Router()


//get request to edit user
router.get('/',async (req,res)=>{
    const editUser = await User.find({email : req.user.email})
    return res.render("edit",{
        user: editUser[0]
    })

})

//view profile image
router.get('/view',async (req,res)=>{
    const editUser = await User.find({email : req.user.email})
    return res.render("view",{
        user: editUser[0]
    })

})


//get request to edit profile image
router.get('/image',async (req,res)=>{
    const editUser = await User.find({email : req.user.email})
    return res.render("editImage",{
        user: editUser[0]
    })
})


//middleware to save profile image
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, path.resolve(`./public/images`)) 
      },
      filename: function (req, file, callback) {
        const uniqueName = Date.now() + '-' + file.originalname 
        return callback(null, uniqueName)
      }
})
const upload = multer({storage})


//post to change profile image
router.post('/image',upload.single('profileImage'), async (req,res)=>{
    const editUser = await User.findOneAndUpdate({email : req.user.email},{
        profileImageURL: `/images/${req.file.filename}`
    })    
    res.redirect("/")
})


//get request to edit name
router.get('/name',async (req,res)=>{
    const editUser = await User.find({email : req.user.email})
    return res.render("editName",{
        user: editUser[0]
    })
})


//post to change Name
router.post('/name',async (req,res)=>{
    const body= req.body
    const editUser = await User.findOneAndUpdate({ email: req.user.email},{
        name: body.fullName
    }) 
    
    res.redirect("/")
})


//get request to edit password
router.get('/password',async (req,res)=>{
    const editUser = await User.find({email : req.user.email})
    return res.render("checkPassword",{
        user: editUser[0]
    })
})

//post to check password
router.post('/checkpassword',async (req,res)=>{
    const body= req.body
     

    const user = await User.matchPassword(req.user.email , body.password)
    const editUser = await User.find({email : req.user.email})

     if(!user) return res.render("checkPassword", {
        error: "incorrect password",
        user: editUser[0]
        
    });
    
    res.render("editPassword",{
        user: editUser[0]
    })
})


//post to change password
router.post('/changePassword',async (req,res)=>{ 
    const body= req.body
    const user = await User.find({email : req.user.email})
    if(body.password !== body.passwordDuplicate) return res.render("editPassword", {
        error: "Password doesn't match",
        user: user[0]        
    });

    const hashedPassword = createHmac('sha256',user[0].salt)   
        .update(body.password)
        .digest('hex'); 

    const editUser = await User.findOneAndUpdate({email : req.user.email},{
        password: hashedPassword
    })  
    res.redirect("/")
})


module.exports = router 