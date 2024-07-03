const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const postController= {
    //create

    createPost:asyncHandler(async(req,res)=>{
    
        //get payload
        const {description}=req.body;
       
        const postCreated=await Post.create({description});
        res.json({
            status:"success",
            message:"Post created Successfully",
            postCreated,
        });
    
    }),
    //list
    fetchAllPosts:asyncHandler(
        async(req,res)=>{
           
                const posts = await Post.find();
                res.json({
                    status:"success",
                    message:"posts fetched successfully",
                    posts,
                })
           
        }
    ),
    //get a post 
    getPost :asyncHandler(
        async(req,res)=>{
            
                const postId = req.params.postId;
                const postFound = await Post.findById(postId);
                res.json({
                    status:"success",
                    message:"post fetched successfully",
                    postFound
                })
                
            
        }
    ),
    //update
    updatePost:asyncHandler(
        async(req,res)=>{
          
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
           
        }
    ),
    deletePost:asyncHandler(
        async(req,res)=>{
           
                const postId = req.params.postId;
                const postFound = await Post.findByIdAndDelete(postId);
                res.json({
                    status:"success",
                    message:"post deleted successfully",
                    
                })
                
            
        }
    )
}


//update
//delete
//list
//get single 

module.exports= postController;