const express = require("express");

const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const postController = require("../../controllers/posts/postController");

const postRouter = express.Router();
//create post 
postRouter.post("/api/v1/posts/create",postController.createPost)

//get all posts 
postRouter.get("/api/v1/posts",postController.fetchAllPosts)
//delete post 
postRouter.delete("/api/v1/posts/:postId",postController.deletePost)
//update post 
postRouter.put("/api/v1/posts/:postId",postController.updatePost)

//get a single post 
postRouter.get("/api/v1/posts/:postId",postController.getPost)
module.exports= postRouter;
