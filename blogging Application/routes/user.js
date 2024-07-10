const express = require("express")
const User = require("../models/user")
const  {createToken,validateToken} = require("../service/auth")
const multer  = require("multer")
const path = require("path");
const { createHmac } = require('node:crypto');


const router = express.Router()

// get signin
router.get('/signin', (req,res)=>{
    return res.render("signin")
})

//get signup
router.get('/signup', (req,res)=>{
    return res.render("signup")
})

//signin user
router.post('/signin', async (req,res)=>{
    const body = req.body;

    const user = await User.matchPassword(body.email , body.password)
     if(!user) return res.render("signin", {
        error: "invalid username or password"
        
    });

    const token = createToken(user)  
    res.cookie("token", token)

    return res.redirect("/")

})

//create new user
router.post('/signup', async (req,res)=>{
    const body = req.body;
    const newUser = await User.create({
        fullName: body.fullName,
        email: body.email,
        password: body.password
    })
    const token = createToken(newUser)  
    res.cookie("token", token)
    return res.redirect("/")
})

//get request to edit user
router.get('/edit',async (req,res)=>{
    const editUser = await User.find({_id : req.user._id})
    return res.render("edit",{
        user: editUser[0]
    })

})


//get request to edit profile image
router.get('/editImage',async (req,res)=>{
    const editUser = await User.find({_id : req.user._id})
    return res.render("editImage",{
        user: editUser[0]
    })
})


//middleware to save profile image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve(`./public/images`)) 
      },
      filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname 
        return cb(null, uniqueName)
      }
})
const upload = multer({storage})


//post to change profile image
router.post('/editImage',upload.single('profileImage'), async (req,res)=>{
    const editUser = await User.findOneAndUpdate({_id : req.user._id},{
        profileImageURL: `/images/${req.file.filename}`
    })    

   

    const token = createToken(editUser)  
    res.cookie("token", token)
    
    res.redirect("/")
})


//get request to edit name
router.get('/editName',async (req,res)=>{
    const editUser = await User.find({_id : req.user._id})
    return res.render("editName",{
        user: editUser[0]
    })
})


//post to change Name
router.post('/editName',async (req,res)=>{
    const body= req.body
    const editUser = await User.findOneAndUpdate({_id : req.user._id},{
        fullName: body.fullName
    }) 
    
    res.redirect("/")
})


//get request to edit password
router.get('/editPassword',async (req,res)=>{
    const editUser = await User.find({_id : req.user._id})
    return res.render("checkPassword",{
        user: editUser[0]
    })
})

//post to check password
router.post('/checkpassword',async (req,res)=>{
    const body= req.body
    console.log(body.password)
    console.log(req.user.email) 

    const user = await User.matchPassword(req.user.email , body.password)
    const editUser = await User.find({_id : req.user._id})

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
    const user = await User.find({_id : req.user._id})
    if(body.password !== body.passwordDuplicate) return res.render("editPassword", {
        error: "Password doesn't match",
        user: user[0]        
    });

    const hashedPassword = createHmac('sha256',user[0].salt)   
        .update(body.password)
        .digest('hex'); 

    const editUser = await User.findOneAndUpdate({_id : req.user._id},{
        password: hashedPassword
    })  
    res.redirect("/")
})
module.exports = router 