const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const Blogs = require("./models/blog")

const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const {checkForAuthentication} = require('./middleware/auth')

const app = express();
const port = 8008;





app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)
app.use(express.static(path.resolve("./public"))) //this middleware indicates express to use public folder statically so that image can be used as it is

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.get('/' ,  async (req,res)=>{
    const allBlogs =  await Blogs.find({}) 
    res.render('home',{
        user: req.user,
        blogs: allBlogs
    })
})


mongoose
.connect("mongodb://localhost:27017/Blogify")
.then(()=> console.log("mongo db connected"))
.catch((err)=> console.log("mongo connection error",err))

app.listen(port , ()=> console.log('server started'));
