//all front end pages called static
const express = require ("express")
const router = express.Router();
const url = require('../models/url')
const{getuser} = require ("../service/auth")

//home page before login
router.get("/",async (req,res)=>{
    const useruid = req.cookies?.uid
    if(!useruid) return res.render("default")
    
    const user = getuser(useruid);
    if(!user) return res.render("default")
    const allurls= await url.find({})

    return res.render('home',{
        urls : allurls
    })
    
})


//sign in page
router.get("/signup",async (req,res)=>{
    return res.render('signup') 
})


//login page
router.get("/login", async (req,res)=> {
    return res.render('login')   
})


module.exports = router