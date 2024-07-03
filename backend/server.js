const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const express=require("express");
const Post= require("./models/Post/Post");
const connectDB = require("./utils/connectDB");
connectDB();
const app= express();

const PORT = 5000;
//middlewares
app.use(express.json())
const corsOptions = {
    origin:["http://localhost:5173"],
    credentials:true
}
app.use(cors(corsOptions))
//create post
app.post("/api/v1/posts/create",async(req,res)=>{
    try {
        //get payload
        const postData=req.body;
        const postCreated=await Post.create(postData);
        res.json({
            status:"success",
            message:"Post created Successfully",
            postCreated,
        });
    } catch (error) {
        console.log(error);
        res.json(error);
        
    }
})

app.listen(PORT,console.log(`Server is up and running at : ${PORT}`))
