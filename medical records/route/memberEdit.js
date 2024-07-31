const express = require("express")

const User = require("../models/user")
const Member = require("../models/member")

const path = require("path");
const multer  = require("multer")



const router = express.Router()




//view profile image
router.get('/view/:memberID',async (req,res)=>{
    const editUser = await User.find({userId : req.user.userId})
    const viewMember = await Member.find({memberId : req.params.memberID},'name , profileImageURL')

    return res.render("memberView",{
        user: editUser[0],
        member: viewMember[0]
    })

})


//get request to edit profile image
router.get('/image/:memberID',async (req,res)=>{
    const editMember = await Member.find({memberId : req.params.memberID},'memberId , name , profileImageURL')
    const editUser = await User.find({userId : req.user.userId})
    return res.render("memberEditImage",{
        user: editUser[0],
        member: editMember[0]
    })
})


//middleware to save profile image
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, path.resolve(`./public/member`)) 
      },
      filename: function (req, file, callback) {
        const uniqueName = Date.now() + '-' + file.originalname 
        return callback(null, uniqueName)
      }
})
const upload = multer({storage})


//post to change profile image
router.post('/image/:memberID',upload.single('profileImage'), async (req,res)=>{
    const editMember = await Member.findOneAndUpdate({memberId : req.params.memberID },{
        profileImageURL: `/member/${req.file.filename}`
    })    
    res.redirect(`/documents/${req.params.memberID}`)
})


//get request to edit name
router.get('/name/:memberID',async (req,res)=>{
    const editMember = await Member.find({memberId : req.params.memberID},'memberId , name , profileImageURL')
    const editUser = await User.find({userId : req.user.userId})
    return res.render("memberEditName",{
        user: editUser[0],
        member: editMember[0]
    })
})


//post to change Name
router.post('/name/:memberID',async (req,res)=>{
    const body = req.body
    const editMember = await Member.findOneAndUpdate({ memberId : req.params.memberID},{
        name: body.name
    }) 
    
    res.redirect(`/documents/${req.params.memberID}`)
})

//get to edit age
router.get('/age/:memberID',async (req,res)=>{
    const editMember = await Member.find({memberId : req.params.memberID},'memberId , name , profileImageURL')
    const editUser = await User.find({userId : req.user.userId})
    
    return res.render("memberEditAge",{
        user: editUser[0],
        member: editMember[0]
    })
})


//post to edit age
router.post('/age/:memberID',async (req,res)=>{
    const body = req.body
    const editMember = await Member.findOneAndUpdate({ memberId : req.params.memberID},{
        age: body.age
    }) 
    
    res.redirect(`/documents/${req.params.memberID}`)
})



module.exports = router 