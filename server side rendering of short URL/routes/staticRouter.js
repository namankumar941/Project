//all front end pages called static
const path = require("path")
const express = require ("express")
const router = express.Router();
const url = require('../models/url')


router.get("/",async (req,res)=>{
    return res.render('default')
    
})

router.get("/signup",async (req,res)=>{
    return res.render('signup') 
})

router.get("/login", async (req,res)=> {
    return res.render('login')   
})


module.exports = router