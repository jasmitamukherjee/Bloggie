const Earnings = require("../models/Earning/Earnings");
const Post = require("../models/Post/Post");

//Rate
const RATE_PER_VIEW = 0.05;

const calculateEarnings = async () => {
    const currentDate = new Date();
    const posts = await Post.find().populate('author');
       for (const post of posts) {
    //   const newViewsCount = post.viewers.length - post.lastCalculatedViewsCount;
    const newViewsCount = post.viewers.length;
  
    const earningsAmount = newViewsCount * RATE_PER_VIEW;
  
      if (!post.author) {
        console.error(`Post ${post._id} is missing an author.`);
        continue;
      }
  
      await Earnings.create({
        user: post.author._id,  // Ensure you're passing the ObjectId of the user
        post: post._id,
        amount: earningsAmount,
        calculatedOn: currentDate,
      });
  
      post.lastCalculatedViewsCount = post.viewers.length;
      post.nextEarningDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1
      );
  
      await post.save();
    }
  
    // console.log("Earnings calculated...", posts);
  };
  module.exports = calculateEarnings;
