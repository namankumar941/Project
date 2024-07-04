const url = require("../models/url")
const express = require("express")

const router = express()


//display all urls in our database
router.get('/',async(req,res)=>{
    const allurls = await url.find({})
    res.json(allurls)
})

//redirect to our original url from short id
router.get('/:shortid',async(req,res)=>{
    const shortId = "http://localhost:8001/url/" + req.params.shortid
    const entry = await url.findOne({shortid: shortId})
    const redirect= entry.redirecturl
    return res.redirect(redirect)
})

module.exports = router