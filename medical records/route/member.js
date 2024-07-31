const express = require("express")
const uuid = require ("uuid")

const User = require("../models/user")
const Member = require("../models/member")

const router = express.Router()

router.get('/', async (req,res)=>{
    const user = await User.find({userId : req.user.userId})
    const allMembers = await Member.find({userId : req.user.userId})
    return res.render('allMember',{
        user: user[0],
        members : allMembers
    })
})

//get request to add member
router.get('/add', async (req,res)=>{
    const editUser = await User.find({userId : req.user.userId})
    return res.render('addMember',{
        user: editUser[0]
    })
})

//post request to add member
router.post('/add', async (req,res)=>{
    const body = req.body 
    const id = uuid.v4()
    const newMember = await Member.create({
        memberId: id,
        name : body.name,
        age: body.age,
        userId : req.user.userId,
    })
    return res.redirect('/member')
})

module.exports = router