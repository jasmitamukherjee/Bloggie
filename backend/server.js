const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const passport = require("./utils/passport-config");

const express=require("express");
const cookieParser=require("cookie-parser");
const cron=require("node-cron")
const Post= require("./models/Post/Post");
const connectDB = require("./utils/connectDB");
const postRouter = require("./routers/post/postRouter");
const usersRouter = require("./routers/users/usersRouter");
const categoriesRouter = require("./routers/category/categoriesRouter");
const planRouter = require("./routers/plan/planRouter");
const stripePaymentRouter = require("./routers/stripePayment/stripePaymentRouter");
const calculateEarnings = require("./utils/calculateEarnings");
const earningsRouter = require("./routers/earnings/earningsRouter");
const notificationRouter = require("./routers/notification/notificationRouter");
const commentRouter = require("./routers/comments/commentsRouter");

connectDB();
// calculateEarnings();
cron.schedule("59 23 * * *",async()=>{
    const today=new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate()+1)
if(today.getMonth() !== tomorrow.getMonth())
    {calculateEarnings();}

},{
    scheduled:true,
    timezone:"Asia/Kolkata"
})
const app= express();

const PORT = process.env.PORT || 5000;
//middlewares

app.use(express.json())
const corsOptions = {
    origin:process.env.FRONTEND_URL || "http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

//passport middleware 
app.use(passport.initialize());
app.use(cookieParser());
//route handlers
app.use("/",postRouter)
app.use("/",usersRouter)
app.use("/",categoriesRouter)
app.use("/",planRouter)
app.use("/",stripePaymentRouter)
app.use("/",earningsRouter)
app.use("/",notificationRouter)
app.use("/",commentRouter)







//not found handler 
app.use((req,res,next)=>{
    res.status(404).json({
        message:"Route not found on our server"
    })
})
//middlewares to handle errors 
app.use((err,req,res,next)=>{
    const message= err.message
    const stack = err.stack
    console.log(message)
    res.status(500).json({
        message,
        stack,

    })

})
app.listen(PORT,console.log(`Server is up and running at : ${PORT}`))
