const express = require("express");

const multer= require("multer");
const Post = require("../../models/Post/Post");
const postController = require("../../controllers/posts/postController");
const storage = require("../../utils/fileupload");
const upload = multer({storage})
const postRouter = express.Router();
//create post 
postRouter.post("/api/v1/posts/create", upload.single("image"), postController.createPost)

//get all posts 
postRouter.get("/api/v1/posts",postController.fetchAllPosts)
//delete post 
postRouter.delete("/api/v1/posts/:postId",postController.deletePost)
//update post 
postRouter.put("/api/v1/posts/:postId",postController.updatePost)

//get a single post 
postRouter.get("/api/v1/posts/:postId",postController.getPost)
module.exports= postRouter;
