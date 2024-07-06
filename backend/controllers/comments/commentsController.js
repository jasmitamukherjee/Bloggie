const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const Comment = require("../../models/Comment/Comment");
const commentsController = {
  create: asyncHandler(async (req, res) => {
    const { postId, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    const commentCreated = await Comment.create({
      content,
      author: req.user._id,  // Store the user ID
      post: postId,
    });
    post.comments.push(commentCreated._id);
    await post.save();

    // Populate the author field
    await commentCreated.populate('author', 'username');

    res.json({
      status: "success",
      message: "Comment created successfully",
      commentCreated,
    });
  }),

  delete: asyncHandler(async (req, res) => {}),
  update: asyncHandler(async (req, res) => {}),
};

module.exports = commentsController;
