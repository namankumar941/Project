const jwt = require("jsonwebtoken")
const secret = "nksingh@123"

function createToken(user){
    return jwt.sign(
        {
            email: user.email
        }, 
        secret)
}

function validateToken(token){
    if(!token) return null
    try{
        return jwt.verify(token , secret)
    }catch(err){
        return null;
    }
    
}

module.exports = {
    createToken,
    validateToken
}