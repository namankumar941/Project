const express = require ("express");
let users = require ("./MOCK_DATA.json")
const fs = require("fs")

const app = express()
const port =8000

app.use(express.urlencoded({extended:false})) //Middleware

//get all users
app.get("/users",(req,res) => {
    return res.json(users)
});

//add new user
app.post("/users",(req,res) => {
    const body= req.body;    
    users.push({ ...body, id: users.length + 1})
    fs.writeFile("./MOCK_DATA.json", JSON. stringify(users),(err,data)=>{
        return res.json({status:"success"})
    })
})


app
.route("/users/:id")
//get user by id
.get((req,res)=>{
    const id =Number(req.params.id)
    const user= users.find((user)=> user.id===id)
    return res.json(user);
})
//delete user by id
.delete((req,res)=>{
    const id =Number(req.params.id);
    users = users.filter(user => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON. stringify(users),(err,data)=>{
        if (err) {
            console.error('Error writing file:', err);
            return res.json({ status: "error", message: "Failed to delete user" });
          }
          return res.json({ status: "success" });
    })
})
//edit user by id
.patch((req,res)=>{
    const id =Number(req.params.id)
    const body = req.body
    const idx= users.findIndex((user)=> user.id===id)
    if(idx!= -1){
        for(let key in body){
            users[idx][key] = body[key];
        }
        fs.writeFile("./MOCK_DATA.json", JSON. stringify(users),(err,data)=>{
            return res.json({status:"success"})
        })
    }
})


app.listen(port,()=>console.log("server started"))