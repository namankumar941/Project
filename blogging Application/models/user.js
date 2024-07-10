const mongoose = require('mongoose')
const { createHmac, randomBytes } = require('node:crypto');

const userSchema = mongoose.Schema({
    fullName: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    salt: {
        type : String
    },
    password: {
        type : String,
        required : true
    },
   profileImageURL : {
    type : String,
    default: '/images/default.png'    
   },
   role :{
    type : String,
    enum: ['USER','ADMIN'],
    default: 'USER'
   }
},{timestamps : true});


//whenever we try to save user this pre function will run first
userSchema.pre("save", function (next){
    const user = this;

    if(!user.isModified("password")) return ;

    const salt = randomBytes(16).toString();  //salt is random string 

    //hashing of password
    const hashedPassword = createHmac('sha256',salt)    //sha256 is the algorithm that is used
        .update(user.password)
        .digest('hex');   // give in hex form
    
    this.salt = salt
    this.password = hashedPassword

    next();
})


// static function to match password
userSchema.static('matchPassword', async function(email, password) {
    const user = await this.findOne({ email })
    if(!user) return null
    const salt = user.salt
    const hashedPassword = user.password

    //hashing user provided password
    const userProvidedHash = createHmac('sha256',salt)    
        .update(password)
        .digest('hex');

    if(hashedPassword !== userProvidedHash) return null

    return user


})
const User = mongoose.model('user', userSchema)

module.exports = User;