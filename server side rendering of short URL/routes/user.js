const express = require ("express")
const user = require('../models/users')
const  {setuser,getuser} = require("../service/auth")
const router = express.Router();
const url = require('../models/url')

//add new user
router.post("/", async (req,res)=> {
    const body = req.body
    
    await user.create({
        name: body.name,
        email: body.email,
        password: body.password
    })
    return res.redirect("/")
})


// login page
router.post("/login", async (req,res)=> {
    const {email , password} = req.body
    
    const user1= await user.findOne({ email: email , password: password })
    if(!user1) return res.render("login", {
        error: "invalid username or password"
        
    });

      
    const token = setuser(user1)  
    res.cookie("uid", token)

    const allurls= await url.find({})

    return res.render('home',{
        urls : allurls
    })
    
   
})

module.exports = router