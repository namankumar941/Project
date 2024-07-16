const express = require("express")
const friend = require ("../models/friends")
const User = require("../models/user")

const router = express.Router()

//list of all friends
router.get('/', async (req,res)=>{
    const userFriend =  await friend.find({email : req.user.email})
    const user = await User.find({email : req.user.email})

    const allFriends = [];
    if(userFriend[0]){
        for(let email of userFriend[0].friends){
            const user = await User.find({email : email})
            allFriends.push(user[0])
        }
    }
    
    res.render('friend',{
        user: user[0],
        friends: allFriends,        
    })

})

//get request to send friend request
router.get('/request', async (req,res)=>{
    
    const userFriend =  await friend.find({email : req.user.email})
    const user = await User.find({email : req.user.email})

    const allFriendRequest =[] ;
   
    if(userFriend[0] && userFriend[0].friendRequest){
       for(let email of userFriend[0].friendRequest){        
            const user = await User.find({email : email})
            allFriendRequest.push(user[0])
        } 
    }
    

    res.render('friendRequest',{
        user: user[0],
        friends: allFriendRequest,        
    })

})

//to accept friend request
router.get('/accept/:email', async (req,res) => {
    const email = req.params.email;
    let userFriend =  await friend.find({email : req.user.email})
    userFriend[0].friends.push(email)
    const requestToRemove = userFriend[0].friendRequest.indexOf(email)
    userFriend[0].friendRequest.splice(requestToRemove, 1);

    await friend.updateOne({email : req.user.email}, userFriend[0]);

    userFriend = await friend.find({email : email})
    
    if(!userFriend[0]){
        
        await friend.create({
            email: email,
            friends : [req.user.email]
        })
    }
    else{
        userFriend[0].friends.push(req.user.email)
        
        await friend.updateOne({email : email}, userFriend[0]);
    }

    return res.redirect('/friend/request')
})

//to reject request
router.get('/reject/:email', async (req,res) => {
    const email = req.params.email
    const userFriend =  await friend.find({email : req.user.email})
    const requestToRemove = userFriend[0].friendRequest.indexOf(email)
    userFriend[0].friendRequest.splice(requestToRemove, 1);   

    await friend.updateOne({email : req.user.email}, userFriend[0]); 

    return res.redirect('/friend/request')
})

//post request to send friend request
router.post('/sendRequest', async(req,res)=>{
    const body = req.body;      
    let requestFriend =  await User.find({email : body.email})
    

    const currentUserFriends =  await friend.find({email : req.user.email})
    const user = await User.find({email : req.user.email})

    
    const allFriendRequest = [];
    if(currentUserFriends[0]){
       for(let email of currentUserFriends[0].friendRequest){
        const user = await User.find({email : email})
        allFriendRequest.push(user[0])
    } 
    }
    
    if(!requestFriend[0] || req.user.email == body.email){
        return res.render('friendRequest',{
            user: user[0],
            friends: allFriendRequest,
            error: 'User Not found'       
        })
    }
    
    if(currentUserFriends[0] && currentUserFriends[0].friendRequest.includes(body.email)){
        return res.render('friendRequest',{
            user: user[0],
            friends: allFriendRequest,
            error: 'user present in your request list'       
        })
    }
    
    requestFriend =  await friend.find({email : body.email})

    if(requestFriend[0] && requestFriend[0].friendRequest.includes(req.user.email)){
        return res.render('friendRequest',{
            user: user[0],
            friends: allFriendRequest,
            error: 'already request sent'       
        })
    }

    if(requestFriend[0] && requestFriend[0].friends.includes(req.user.email)){
        return res.render('friendRequest',{
            user: user[0],
            friends: allFriendRequest,
            error: 'Already friend'       
        })
    }


    if(!requestFriend[0]){
        await friend.create({
            email: body.email,
            friendRequest : [req.user.email]
        })
    }
    else{
        requestFriend[0].friendRequest.push(req.user.email)
        await friend.updateOne({email :  body.email}, requestFriend[0]);
    }
    return res.render('friendRequest',{
        user: user[0],
        friends: allFriendRequest,
        error: 'friend request sent'       
    })
    
})


module.exports = router 