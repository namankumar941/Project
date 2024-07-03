const express = require ("express")
const user = require('../models/users')
const {v4 : uuidv4} = require("uuid")
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

router.post("/login", async (req,res)=> {
    const {email , password} = req.body
    
    const user1= await user.findOne({ email: email , password: password })
    if(!user1) return res.render("login", {
        error: "invalid username or password"
        
    });

    const sessionid = uuidv4()  
    setuser(sessionid, user)  
    res.cookie("uid", sessionid)

    const allurls= await url.find({})

    return res.render('home',{
        urls : allurls
    })
    
   
})

module.exports = router