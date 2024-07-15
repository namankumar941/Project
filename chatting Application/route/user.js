const User = require('../models/user')
const express = require('express')
const  {createToken} = require("../service/auth")

const router = express.Router()

//get request for signup page
router.get('/signup', (req,res)=>{
    return res.render("signup")
})

//creating new account
router.post('/signup', async(req,res)=>{
    const body = req.body;
    if(await User.findOne( {email : body.email})){
        res.render('signup',{
            error : 'email exist'
        }) 
    }
    else{
        await User.create({
            name: body.name,
            email: body.email,
            password: body.password
        }) 
        res.redirect('/user/signin')
    }             
})

//get request for signin page
router.get('/signin', (req,res)=>{
    return res.render("signin")
})

//login to your id
router.post('/signin', async(req,res)=>{
    const body = req.body;
    const user = await User.matchPassword(body.email , body.password)
     if(!user) return res.render("signin", {
        error: "invalid username or password"
        
    });

    const token = createToken(user)  
    res.cookie("token", token)

    return res.redirect("/")
})
module.exports = router