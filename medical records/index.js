const express = require("express")
const mongoose = require('mongoose')
const path = require('path')
const cookieSession = require('cookie-session')

const {secretKey } = require("./secretData")

const User = require("./models/user")

const userRoute = require('./route/user');
const authRoute = require('./route/auth');
const userEditRoute = require("./route/userEdit")
const memberRoute = require('./route/member');
const documentsRoute = require('./route/documents');
const memberEditRoute = require("./route/memberEdit")

const passport = require("passport")

const app = express();
const port= 8000

//middleware to initialize passport and creating cookie
app.use(cookieSession({
    keys: [secretKey], // key used to encrypt cookie
    maxAge: 24*60*60*1000
    
}))
app.use(passport.initialize())
app.use(passport.session())


app.set("view engine", 'ejs')
app.set('views',path.resolve('./views'))

app.use(express.static(path.resolve("./public")))

app.use(express.urlencoded({extended: false}))
app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use("/userEdit", userEditRoute)
app.use("/member", memberRoute)
app.use("/documents", documentsRoute)
app.use("/memberEdit", memberEditRoute)

app.get("/",async (req,res)=>{
    return res.render('home',{
        user: req.user
    }) 
})

app.get("/logout",async (req,res)=>{
   req.logout();
    return res.render('home') 
})


mongoose
.connect("mongodb://localhost:27017/medicalRecords")
.then(()=> console.log("mongo db connected"))
.catch((err)=> console.log("mongo connection error",err))


app.listen(port, ()=> console.log("server started"))