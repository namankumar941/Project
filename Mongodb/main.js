const mongoose = require ("mongoose");
const express = require ("express")
const userroute = require ("./router/user")



const app = express()

//middleware
app.use(express.urlencoded({extended: false})) //middleware
app.use("/users",userroute)

//connect mongoose to node.js
mongoose
.connect("mongodb://127.0.0.1:27017/dataentry")
.then(()=> console.log("mongo db connected"))
.catch((err)=> console.log("mongo error",err))

//server started
app.listen(8000,()=>console.log("server started"))
 