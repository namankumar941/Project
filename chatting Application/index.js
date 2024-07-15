const express = require("express")
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
const User = require("./models/user")

const {checkForAuthentication} = require('./middleware/auth')

const editRoute = require("./route/edit")
const userRoute = require('./route/user');
const friendRoute = require('./route/friends');

const app = express();
const port= 8002

app.set("view engine", 'ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)
app.use(express.static(path.resolve("./public")))

app.use('/user', userRoute)
app.use("/edit", editRoute)
app.use("/friend", friendRoute)

app.get("/",async (req,res)=>{
    if(!req.user) return res.render('home') 
    const user = await User.find({email : req.user.email})
    return res.render('home',{
        user: user[0]
    })
})

app.get('/logout', (req,res)=>{
    res.cookie("token", null)
    return res.redirect('/')
})

mongoose
.connect("mongodb://localhost:27017/chatting")
.then(()=> console.log("mongo db connected"))
.catch((err)=> console.log("mongo connection error",err))


app.listen(port, ()=> console.log("server started"))