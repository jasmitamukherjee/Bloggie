const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const Category= require("../../models/Category/Category")
const postController= {
    //create

    createPost:asyncHandler(async(req,res)=>{
        // console.log(req.file);
    
        //get payload
        const {description,category}=req.body;
        const categoryFound = await Category.findById(category);
        if (!categoryFound) {
          throw new Error("Category not found");
        }        
        
        const postCreated=await Post.create({description,image:req.file,author:req.user,category});
        //push post into catgory 
        categoryFound.posts.push(categoryFound?._id);
 //resave the category
 await categoryFound.save();
        
        res.json({
            status:"success",
            message:"Post created Successfully",
            postCreated,
            
        });
    
    }),
    //list
    fetchAllPosts:asyncHandler(
        async(req,res)=>{
            //basic filter 
            const {category,title,page=1,limit=10}=req.query;

           let filter={

           }
           if(category){
            filter.category=category;
           }
if(title){
    filter.description= {$regex:title,$options:"i"};
}
                const posts = await Post.find(filter).populate("category").sort({createdAt:-1}).skip((page-1)*limit).limit(limit);
               const totalPosts = await Post.countDocuments(filter)
                res.json({
                    status:"success",
                    message:"posts fetched successfully",
                    posts,
                    currentPage:page,
                    perPage:limit,
                    totalPages:Math.ceil(totalPosts/limit)
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