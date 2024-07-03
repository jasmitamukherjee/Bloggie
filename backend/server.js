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

//all posts display 

app.get("/api/v1/posts",async(req,res)=>{
    try {
        const posts = await Post.find();
        res.json({
            status:"success",
            message:"posts fetched successfully",
            posts,
        })
    } catch (error) {
        res.json(error);
        
    }
})

//update posts 
app.put("/api/v1/posts/:postId",async(req,res)=>{
    try {
        const postId = req.params.postId;
        const postFound= await Post.findById(postId);
        if(!postFound){
            throw new Error("Post not found")
        }
        const postUpdated= await Post.findByIdAndUpdate(postId,{title:req.body.title,description:req.body.description},{
            new:true
        })
        res.json({
            status:"success",
            message:"post updated successfully",
            postUpdated
        })
    } catch (error) {
        throw new Error(error)
        
    }
})

//get post
app.get("/api/v1/posts/:postId",async(req,res)=>{
    try {
        const postId = req.params.postId;
        const postFound = await Post.findById(postId);
        res.json({
            status:"success",
            message:"post fetched successfully",
            postFound
        })
        
    } catch (error) {
        throw new Error(error)
        
    }
})

//DELETE POST 
app.delete("/api/v1/posts/:postId",async(req,res)=>{
    try {
        const postId = req.params.postId;
        const postFound = await Post.findByIdAndDelete(postId);
        res.json({
            status:"success",
            message:"post deleted successfully",
            
        })
        
    } catch (error) {
        throw new Error(error)
        
    }
})
app.listen(PORT,console.log(`Server is up and running at : ${PORT}`))
