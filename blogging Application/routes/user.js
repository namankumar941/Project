const express = require("express")
const User = require("../models/user")
const  {createToken,validateToken} = require("../service/auth")
const multer  = require("multer")
const path = require("path");



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


module.exports = router 