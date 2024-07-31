const User = require("../models/user")
const Member = require("../models/member")

const express = require("express")

const router = express.Router()

router.get("/:memberID", async(req,res)=>{
    const user = await User.find({userId : req.user.userId})
    const member = await Member.find({memberId : req.params.memberID},'memberId , name , age , profileImageURL')
    console.log(member)
    return res.render('documents',{
        user: user[0],
        member: member[0]
    })
})


module.exports = router