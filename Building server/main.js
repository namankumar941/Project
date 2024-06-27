const http = require ("http");
const fs = require ("fs")
const myserver = http.createServer((req,res) => {
    const now = new Date();
    const log =`Day-> ${Date.now()}  Time-> ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}  ${req.url} :- New request received \n`;
    fs.appendFile("log.txt",log,(err,data) => {
        switch(req.url){
            case "/":
                res.end("home page")
                break;
            case "/about":
                res.end("I am Naman")
                break;
            default :
            res.end("404 not found") 
        }
        
    })
})

myserver.listen(8000,()=> console.log("Server started"));
