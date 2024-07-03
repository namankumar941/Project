const jwt = require("jsonwebtoken")
const secret = "nksingh@123"   //whoever has this key can make token


function setuser(user){
    return jwt.sign(
        {
            _id: user._id,
            email: user.email
        }, 
        secret)
}

function getuser(token){
    if(!token) return null
    try{
        return jwt.verify(token , secret)
    }catch(err){
        return null;
    }
    
}

module.exports = {
    setuser,
    getuser
}