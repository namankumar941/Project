const mongoose = require ("mongoose");
const exress = require ("express")
const fs = require ("fs")

const app = exress()
app.use(exress.urlencoded({extended:false})) //middleware

//connect mongoose to node.js
mongoose
.connect("mongodb://127.0.0.1:27017/dataentry")
.then(()=> console.log("mongo db connected"))
.catch((err)=> console.log("mongo error",err))

// create Schema
const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true  // mandatory entry
    },
    lastname:{
        type: String
    },
    email:{
        type: String,
        require: true,  // mandatory entry
        unique: true    //no 2 entry with same email
    }
},{timestamps: true});  //store time of creation and update of entry


//create Model using schema
const user= mongoose.model("user",userschema);   //user used here same name used by mongo db as collection name ie users


//get all users
app.get("/users",async (req,res) => {
    const alldbusers = await user.find({})
    const html = `
    <ul>
    ${alldbusers.map((user)=> `<li> ${user.firstname} </li>`).join(" ")}
    </ul>`
    res.send(html)
});

//add new user
app.post("/users",async (req,res) => {
    const body= req.body;   
   const result = await user.create({
    firstname : body.firstname,
    lastname : body.lastname,
    email : body.email
   });
   console.log("result",result)
   return res.json({status:"success"})
});


app
.route("/users/:id")
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


app.listen(8000,()=>console.log("server started"))
 