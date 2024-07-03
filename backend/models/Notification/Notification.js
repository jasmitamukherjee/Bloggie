const mongoose =require("mongoose");
const notificationSchema = mongoose.Schema({
    userId:{
        
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        postId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
        },
        isRead:{
            type:Boolean,
            default:false,
        }
            
},
{
    timestamps:true
});

module.exports= mongoose.model("Notification",notificationSchema);