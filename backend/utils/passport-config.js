const passport = require('passport');
const User = require('../models/User/User');
const bcrypt= require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy;
passport.use(
    new LocalStrategy({
usernameField:"username"
    },
async (username,password,done)=>{
try {
    const user = await User.findOne({username});
    if(!user){
        return done(null,false,{message:"No user with that email found"})
    }
const match = await bcrypt.compare(password,user.password)
if(match){
    return done(null,user)
}else{
    return done(null,false,{message:"Invalid credentials"})
}

} catch (error) {
    return done(error)
    
}
})
)

module.exports =passport;