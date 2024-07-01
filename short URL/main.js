const express = require("express")
const urlroute= require("./routes/url") 
const mongoose = require("mongoose")


const app = express()
const port= 8001;


//middleware
app.use(express.urlencoded({extended: false}))
app.use("/url",urlroute)


//connect mongoose to node.js
mongoose
.connect("mongodb://127.0.0.1:27017/short")
.then(()=> console.log("mongo db connected"))
.catch((err)=> console.log("mongo connection error",err))



//server started
app.listen(port , ()=> console.log(`server started`))