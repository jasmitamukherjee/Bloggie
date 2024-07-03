const mongoose = require("mongoose");
const paymentSchema =mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    reference:{
        type:String,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"pending",
    },
    subscriptionPlan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan",
        required:true,
    },
    amount:{
        type:Number,
        default:0,
    },
   
},
{
    timestamps:true,
});

module.exports= mongoose.model("Payment",paymentSchema);
