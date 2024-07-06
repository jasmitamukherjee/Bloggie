const mongoose = require("mongoose");
const postSchema=mongoose.Schema({
    // title:{
    //     type:String,
    //     required:true,
    //     trim:true,
    // },
    description:{
        type:String,
        required:true,
        trim:true,

    },
    image:{
        type:Object,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true, 
    },
    nextEarningDate:{
        type:Date,
        default:()=>
            new Date(new Date().getFullYear(),new Date().getMonth()+1,1)
    },
    lastCalculatedViewsCount:{type:Number,default:0}
    ,

    thisMonthEarnings:{
        type:Number,
        default:0,
    },
    totalEarnings:{
        type:Number,
        default:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    }],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    }],
    viewers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    }],
    viewsCount: { type: Number, default: 0 }
    ,

    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",

    }],
    isBlocked:{
        type:Boolean,
        default:false,
    },



},
{
    timestamps:true,
});

module.exports=mongoose.model("Post",postSchema);