const express = require ("express")
const shortid = require ("shortid")
const url = require('../models/url')

const router = express.Router();


//add new url
router.post("/", async (req,res)=> {
    const body = req.body
    if(!body.url) return res.status(400).json({error : 'URL is required'})
    const shortId = shortid(8)
    await url.create({
        shortid: shortId,
        redirecturl: body.url,
        visithistory: []
    })
    const allurls= await url.find({})

    return res.render('home',{
        id : shortId,
        urls : allurls
    })
})


//get all url
router.get("/",async (req,res)=> {
    const allurl = await url.find({})
    res.json(allurl)    
})


// redirect to original url from shortID
router.get('/:shortId', async (req,res)=>{    
    const shortId = req.params.shortId
    const entry = await url.findOneAndUpdate(
        { shortid : shortId }, 
        {$push : {
            visithistory: {
                timestamp : Date.now()
            },
        } 
    });
     
     res.redirect(entry.redirecturl) 

})


module.exports = router