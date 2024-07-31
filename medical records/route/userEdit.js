const express = require("express")
const User = require("../models/user")
const path = require("path");
const multer  = require("multer")



const router = express.Router()


//get request to edit user
router.get('/',async (req,res)=>{
    const editUser = await User.find({userId : req.user.userId})
    return res.render("userEdit",{
        user: editUser[0]
    })

})

//view profile image
router.get('/view',async (req,res)=>{
    const editUser = await User.find({userId : req.user.userId})
    return res.render("userView",{
        user: editUser[0]
    })

})


//get request to edit profile image
router.get('/image',async (req,res)=>{
    const editUser = await User.find({userId : req.user.userId})
    return res.render("userEditImage",{
        user: editUser[0]
    })
})


//middleware to save profile image
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, path.resolve(`./public`)) 
      },
      filename: function (req, file, callback) {
        const uniqueName = Date.now() + '-' + file.originalname 
        return callback(null, uniqueName)
      }
})
const upload = multer({storage})


//post to change profile image
router.post('/image',upload.single('profileImage'), async (req,res)=>{
    const editUser = await User.findOneAndUpdate({userId : req.user.userId },{
        profileImageURL: `/${req.file.filename}`
    })    
    res.redirect("/")
})


//get request to edit name
router.get('/name',async (req,res)=>{
    const editUser = await User.find({userId : req.user.userId})
    return res.render("userEditName",{
        user: editUser[0]
    })
})


//post to change Name
router.post('/name',async (req,res)=>{
    const body = req.body
    const editUser = await User.findOneAndUpdate({ userId : req.user.userId},{
        name: body.name
    }) 
    
    res.redirect("/")
})

//get to edit age
router.get('/age',async (req,res)=>{
    const editUser = await User.find({userId : req.user.userId})
    
    return res.render("userEditAge",{
        user: editUser[0]
    })
})


//post to edit age
router.post('/age',async (req,res)=>{
    const body = req.body
    const editUser = await User.findOneAndUpdate({ userId : req.user.userId},{
        age: body.age
    }) 
    
    res.redirect("/")
})

//get to edit phoneNumber
router.get('/phoneNumber',async (req,res)=>{
    const editUser = await User.find({userId : req.user.userId})
    
    return res.render("userEditPhoneNumber",{
        user: editUser[0]
    })
})


//post to edit phoneNumber
router.post('/phoneNumber',async (req,res)=>{
    const body = req.body
    const editUser = await User.findOneAndUpdate({ userId : req.user.userId},{
        phoneNumber: body.phoneNumber
    }) 
    
    res.redirect("/")
})

module.exports = router 