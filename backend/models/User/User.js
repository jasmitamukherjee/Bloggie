const mongoose = require("mongoose");
const crypto=require("crypto");
const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    profilePictire:{
        type:Object,
        default:null,
    },
    email:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:false,
    },
    googleId:{
        type:String,
        required:false,
    },
    authMethod:{
        type:String,
        required:true,
        enum:["google","github","facebook","local"],
        default:"local",
    },
    passwordResetToken:{
        type:String,
        default:null,
    },
    accountVerificationToken:{
        type:String,
        default:null,

    },
    accountVerificationExpires:{
        type:Date,
        default:null,

    },
    passwordResetExpires:{
      
            type:Date,
            default:null,
    
        
    },
    posts:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    }],
    totalEarnings:{
        type:Number,
        default:0
    },
    nextEarningDate:{
        type:Date,
        default:()=>
            new Date(new Date().getFullYear(),new Date().getMonth()+1,1),

    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan",
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    },
    payments:[{type:mongoose.Schema.Types.ObjectId,ref:"Payment"}],
    hasSelectedPlan:{
        type:Boolean,
        default:false,
    },
    lastLogin:{
        type:Date,
        default:Date.now,

    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]
},
{
    timestamps:true,
});


userSchema.methods.generateAccVerificationToken=function(){
    const user=this;
    const emailToken = crypto.randomBytes(20).toString("hex");
    user.accountVerificationToken=crypto.createHash("sha256").update(emailToken).digest("hex")
    user.accountVerificationExpires = Date.now()+10 *60*1000;

return emailToken;
}
module.exports=mongoose.model("User",userSchema);