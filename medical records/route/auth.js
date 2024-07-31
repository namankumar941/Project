const User = require("../models/user")
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20")
const express = require("express");
const { clientId, clientSecret } = require("../secretData");


//serialize and deserialize User
passport.serializeUser((user,done)=>{ 
    done(null,user.userId);
})
passport.deserializeUser((userId,done)=>{
    User.find({userId: userId}).then((user) => {
        done(null, user[0]);
    });
})

//creating user using google strategy
passport.use(new googleStrategy({
    clientID: clientId,
    clientSecret: clientSecret ,
    callbackURL: "/auth/google/redirect"
},async (accessToken,refreshToken,profile,done)=>{
    
    const currentUser = await User.find({email : profile._json.email } , 'userId')
    
    if(!currentUser[0]){
        const newUser= await User.create({
            email : profile._json.email,
            name : profile._json.name,
            userId : profile.id,
            profileImageURL : profile._json.picture
        })
        
        
      
       done(null,{userId: newUser.userId});
    }else{
        done(null,currentUser[0]);
    }    
}))



const router = express.Router()

//get request to get auth code from google
router.get('/google',passport.authenticate("google",{
    scope: ['email','profile']
}))

router.get('/google/redirect',passport.authenticate("google") , (req,res)=>{    
    res.redirect('/');
})


module.exports = router 