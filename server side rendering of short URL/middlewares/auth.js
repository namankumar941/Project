const{getuser} = require ("../service/auth")

async function restricttologgedinuseronly(req,res,next){
    const useruid = req.cookies?.uid

    if(!useruid){
        return res.redirect("/login")
    }

    const user = getuser(useruid);
    if(!user) return res.redirect("/login")

    req.user = user
    next()
}


module.exports = {
    restricttologgedinuseronly
}