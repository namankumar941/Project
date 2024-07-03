const sessionidtousermap = new Map()

function setuser(id,user){
    sessionidtousermap.set(id,user)
}

function getuser(id){
    return sessionidtousermap.get(id)
}

module.exports = {
    setuser,
    getuser
}