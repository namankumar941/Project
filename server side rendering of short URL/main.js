const express = require("express")
const urlroute= require("./routes/url") 
const mongoose = require("mongoose")
const url = require('./models/url')
const path = require("path") // inbuilt module
const staticroute = require("./routes/staticRouter")


const app = express()
const port= 8001;

app.set('view engine','ejs')//tell express that which view engine we are about to use
//ejs files are html files
app.set('views',path.resolve("./views")) //tell express where are my ejs file


//middleware
app.use(express.urlencoded({extended: false}))
app.use("/url",urlroute)
app.use("/test",staticroute)






//connect mongoose to node.js
mongoose
.connect("mongodb://127.0.0.1:27017/short")
.then(()=> console.log("mongo db connected"))
.catch((err)=> console.log("mongo connection error",err))



//server started
app.listen(port , ()=> console.log(`server started`))