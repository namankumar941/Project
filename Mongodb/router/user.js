const express = require ("express")
const user = require('../models/user')

const router = express.Router();




//get all users
router.get("/",async (req,res) => {
    const alldbusers = await user.find({})
    return res.json(alldbusers)
});

//add new user
router.post("/",async (req,res) => {
    const body= req.body;   
   const result = await user.create({
    firstname : body.firstname,
    lastname : body.lastname,
    email : body.email
   });
   console.log("result",result)
   return res.json({status:"success"})
});


router
.route("/:id")
//get user by id
.get(async (req,res)=>{
    const user1 = await user.findById(req.params.id)
    if(!user1) return res.status(404).json({ error : "user not found"})
    return res.json(user1);
})
//delete user by id
.delete(async (req,res)=>{
    await user.findByIdAndDelete(req.params.id)
    return res.json({status:"success"})
})
//edit user by id
.patch(async (req,res)=>{
    const body= req.body;
    const updates = {}; // Object to hold update fields

    // Check which fields are present in the request body and add them to updates object
    if (body.firstname) {
        updates.firstname = body.firstname;
    }
    if (body.lastname) {
        updates.lastname = body.lastname;
    }
    if (body.email) {
        updates.email = body.email;
    }
    await user.findByIdAndUpdate(req.params.id,updates);
    return res.json({status:"success"})
})

module.exports = router