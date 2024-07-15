const express = require("express")
const friend = require ("../models/friends")
const User = require("../models/user")

const router = express.Router()

router.get('/', async (req,res)=>{
    const allFriend =  await friend.find({
        $or: [
            { emailID1: req.user.email },
            { emailID2: req.user.email }
        ]
    })

    const user = await User.find({email : req.user.email})

    res.render('friend',{
        user: user[0],
        Friends: allFriend,        
    })

})

module.exports = router 