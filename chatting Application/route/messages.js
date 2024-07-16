const express = require("express")

const friend = require ("../models/friends")
const User = require("../models/user")
const messages = require ("../models/messages")

const router = express.Router()

router.get('/:email', async (req,res)=>{
    const interactionID1 = req.user.email + req.params.email;
    const interactionID2 = req.params.email + req.user.email

    const userMessages = await messages.find({
        $or: [
            { interactionID : interactionID1 },
            { interactionID : interactionID2 },
        ]
    })

    

    const user = await User.find({email : req.user.email})

    if(userMessages[0]){
        return res.render('chat',{
            user: user[0],
            messages: userMessages[0].messages,   
            to: req.params.email 
        })
    }

    await messages.create({
        interactionID: interactionID1,
    })


    
    res.render('chat',{
        user: user[0],  
        to: req.params.email 
    })
        

})

router.post('/send/:email', async (req,res)=>{
    const message = `${req.user.email} : ` + req.body.message
    const interactionID1 = req.user.email + req.params.email;
    const interactionID2 = req.params.email + req.user.email

    const userMessages = await messages.find({
        $or: [
            { interactionID : interactionID1 },
            { interactionID : interactionID2 },
        ]
    })

    if(!userMessages[0]){
        await messages.create({
            interactionID: interactionID1,
            messages: message
        })
    }
    else{
        userMessages[0].messages.push(message)
    await messages.updateOne({$or: [
        { interactionID : interactionID1 },
        { interactionID : interactionID2 },
    ]}, userMessages[0]);

    }
    return res.redirect(`/messages/${req.params.email}`)
})

module.exports = router 