const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const passport = require("./utils/passport-config");

const express=require("express");
const Post= require("./models/Post/Post");
const connectDB = require("./utils/connectDB");
const postRouter = require("./routers/post/postRouter");
const usersRouter = require("./routers/users/usersRouter");
connectDB();
const app= express();

const PORT = 5000;
//middlewares

app.use(express.json())
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

//passport middleware 
app.use(passport.initialize());
//route handlers
app.use("/",postRouter)
app.use("/",usersRouter)

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
