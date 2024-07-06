const express = require("express");

const multer= require("multer");
const Post = require("../../models/Post/Post");
const postController = require("../../controllers/posts/postController");
const storage = require("../../utils/fileupload");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const checkUserPlan = require("../../middlewares/checkUserPlan");
const optionalAuth = require("../../middlewares/optionalAuth");
const isAccountVerified = require("../../middlewares/isAccountVerified");
const upload = multer({storage})
const postRouter = express.Router();
//create post 
postRouter.post("/api/v1/posts/create", isAuthenticated,checkUserPlan,isAccountVerified,upload.single("image"), postController.createPost)

//get all posts 
postRouter.get("/api/v1/posts",postController.fetchAllPosts)
//delete post 
postRouter.delete("/api/v1/posts/:postId", isAuthenticated,postController.deletePost)
//update post 
postRouter.put("/api/v1/posts/:postId", isAuthenticated,upload.single("image"),postController.updatePost)

//get a single post 
postRouter.get("/api/v1/posts/:postId",optionalAuth,postController.getPost)
//like
postRouter.put("/api/v1/posts/likes/:postId", isAuthenticated,postController.like)

//dislike
postRouter.put("/api/v1/posts/dislikes/:postId", isAuthenticated,postController.dislike)

module.exports= postRouter;
