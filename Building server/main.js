const http = require ("http");
const fs = require ("fs")
const myserver = http.createServer((req,res) => {
    const now = new Date();
    const log =`Day-> ${Date.now()}  Time-> ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} :- New request received \n`;
    fs.appendFile("log.txt",log,(err,data) => {
        res.end("hello from server again")
    })
})

myserver.listen(8000);
