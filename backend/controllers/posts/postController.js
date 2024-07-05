const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const Category= require("../../models/Category/Category");
const User = require("../../models/User/User");
const Notification = require("../../models/Notification/Notification");
const sendNotificationMessage = require("../../utils/sendNotificationMessage");
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
        
        const userFound = await User.findById(req.user);
        if (!userFound) {
          throw new Error("User not found");
        }     

        const postCreated=await Post.create({description,image:req.file,author:req.user,category});
        //push post into catgory 
        categoryFound.posts.push(categoryFound?._id);
 //resave the category
 await categoryFound.save();
        //push posts to user 
userFound.posts.push(postCreated?._id)
await userFound.save();
//notif
await Notification.create({
  userId: req.user,
  postId: postCreated._id,
  message: `New post created by ${userFound.username}`,
});

userFound.followers.forEach(async (follower)=>{
  const users = await User.find({_id:follower})

  users.forEach((user)=>{
    sendNotificationMessage(user.email,postCreated._id)

  })

})

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
                const userId=req.user?req.user : null;

                const postFound = await Post.findById(postId);
                if(!postFound){
                  throw new Error("No post found!");
                }
                if(userId){
                  await Post.findByIdAndUpdate(postId,{
                    $addToSet:{viewers:userId},
                  },{
                    new:true
                  })
                  // if(!postFound?.viewers.includes(userId)){
                  //   postFound.viewers.push(userId);
                  //   postFound.viewsCount= postFound?.viewsCount+1;
                  //   await postFound.save();
                  // }

                }
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
    ),

    //like post

  like: asyncHandler(async (req, res) => {
    //Post id
    const postId = req.params.postId;
    //user liking a post
    const userId = req.user;
    //Find the post
    const post = await Post.findById(postId);
    //Check if a user has already disliked the post


    if (post?.dislikes?.includes(userId)) {
      post?.dislikes?.pull(userId);
    }
    //Check if a user has already liked the post
    if (post?.likes?.includes(userId)) {
      post?.likes?.pull(userId);
    } else {
      post?.likes?.push(userId);
    }
    //resave the post
    await post.save();
    //send the response
    res.json({
      message: "Post Liked",
    });
  }),
  //unlike post
  dislike: asyncHandler(async (req, res) => {
    //Post id
    const postId = req.params.postId;
    //user liking a post
    const userId = req.user;
    //Find the post
    const post = await Post.findById(postId);
    //Check if a user has already liked the post
    if (post?.likes.includes(userId)) {
      post?.likes?.pull(userId);
    }
    //Check if a user has already disliked the post
    if (post?.dislikes.includes(userId)) {
      post?.dislikes?.pull(userId);
    } else {
      post?.dislikes?.push(userId);
    }
    //resave the post
    await post.save();
    //send the response
    res.json({
      message: "Post Disliked",
    });
  }),

};



module.exports= postController;