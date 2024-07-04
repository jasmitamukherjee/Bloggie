const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")
const passport = require("passport")
const jwt=require("jsonwebtoken")
const User = require("../../models/User/User");

const userController={

//register
register:asyncHandler(async(req,res)=>{
    const {username,email,password}= req.body;
const userFound= await User.findOne({username,email});
if(userFound){
    throw new Error("User already exists!")
}
const hashedPassword = await bcrypt.hash(password,10);
const userRegistered = await User.create({
    username,email,password:hashedPassword
})

res.status(201).json({
    status:"success",
    message:"user registered successfullly",
    userRegistered
})

}),

//login
login:asyncHandler(async(req,res,next)=>{
    
    passport.authenticate("local",(err,user,info)=>{
        if(err){
            return next(err)
        }
        if(!user){
            return res.status(401).json({message:info.message})
        }

        //token
        const token = jwt.sign({id:user?._id},process.env.JWT_SECRET )
        //set token 
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite:"strict",
            maxAge : 24*60*60*1000
        })
        console.log(token)
        res.json({
            status:"success",
            message:"login succesfull",
            username:user?.username,
            email:user?.email,
            _id:user?._id
        })
    })(req,res,next);
}),
//profile

}

module.exports = userController;