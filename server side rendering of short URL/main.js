const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")


const urlroute= require("./routes/url") 
const staticroute = require("./routes/staticRouter")
const userroute = require("./routes/user") 


const {restricttologgedinuseronly} = require('./middlewares/auth')


const app = express()
const port= 8001;


app.set('view engine','ejs')               //tell express that which view engine we are about to use
app.set('views',path.resolve("./views"))  //tell express where are my ejs file


//middleware
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use("/url",restricttologgedinuseronly,urlroute)
app.use("/user",userroute)
app.use("/",staticroute)






//connect mongoose to node.js
mongoose
.connect("mongodb://127.0.0.1:27017/short")
.then(()=> console.log("mongo db connected"))
.catch((err)=> console.log("mongo connection error",err))



//server started
app.listen(port , ()=> console.log(`server started`))