const jwt = require("jsonwebtoken")
const secret = "nksingh@123" 

function createToken(user){
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
            profileImageURL : user.profileImageURL
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