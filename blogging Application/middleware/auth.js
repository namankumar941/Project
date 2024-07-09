const{validateToken} = require ("../service/auth")

async function checkForAuthentication(req,res,next){
    
        const tokenCookieValue = req.cookies["token"]
    
        if(!tokenCookieValue){
           return next()
        }
    
        try{
            const user = validateToken(tokenCookieValue);
            req.user = user
            
        }catch{
        }
        return next()
        
        
    
    

}

   

module.exports = {
    checkForAuthentication
}