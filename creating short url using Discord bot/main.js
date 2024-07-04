const mongoose = require("mongoose")
const shortid = require ("shortid")
const express = require("express")
const urlRoute = require("./routes/url")

const app = express()
const port = 8001

const urls = require("./models/url")

//GatewayIntentBits it is intent it means what permission we are giving to it
const { Client, GatewayIntentBits } = require('discord.js');


//virtual client that is used to interact by our server
const client = new Client({ intents: [
    GatewayIntentBits.Guilds , 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] });    //these intent means have access to create guilds and can deal with messages



//client messages will receive here
client.on('messageCreate',(message)=>{
    if(message.author.bot) return   //if message is from bot itself

    if(message.content.startsWith("create")){   //if message start with create we have to create short id
        const url = message.content.split("create ")[1]
        const shortID = shortid(8)

        urls.create({   //we have to store data in our mongodb database
            shortid: "http://localhost:8001/url/" + shortID,
            redirecturl : url
        })


        return message.reply({   
            content: "Generating short ID for " + url + "\n short id is http://localhost:8001/url/" + shortID
        })
    }

    message.reply({
        content: "hi from bot"
    })
})

app.use(express.urlencoded({extended: false}))
app.use("/url",urlRoute)

//connect mongoose
mongoose
.connect("mongodb://127.0.0.1:27017/discord-url")
.then(()=> console.log("mongo DB connected"))
.catch((err)=> console.log("mongo connection error \n" , err))




client.login("MTI1ODM1Mjk4NTA1MDg0NTI3OQ.GkDlCg.QxDcFjGswu9GC1iu2uY_eStqQZLlsYaVnx6wrE") //bot token

//server started
app.listen(port , ()=> console.log(`server started`))