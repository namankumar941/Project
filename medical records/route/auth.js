const User = require("../models/user")
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20")
const express = require("express");
const { clientId, clientSecret } = require("../secretData");

//serialize and deserialize User
passport.serializeUser((user,done)=>{   
    done(null,user[0].userId);
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
    const currentUser = await User.find({email : profile._json.email })
    if(!currentUser[0]){
        const newUser = await User.create({
            email : profile._json.email,
            name : profile._json.name,
            userId : profile.id,
            profileImageURL : profile._json.picture
        })
        done(null,newUser);
    }else{
        done(null,currentUser);
    }    
}))



const router = express.Router()

//get request to get auth code from google
router.get('/google',passport.authenticate("google",{
    scope: ["profile"],
}))

router.get('/google/redirect',passport.authenticate("google") , (req,res)=>{
    console.log(req.user)
    res.redirect('/profile');
})


module.exports = router 