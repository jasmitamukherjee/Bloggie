import axios from "axios";
const BASE_URL='http://localhost:5000/api/v1/posts'
//create post API
export const createPostAPI = async (postData)=>{
    console.log(postData)
     const response =await axios.post(`${BASE_URL}/create`,{
        title:postData.title,
        description:postData.description
     });
     return response;
}

//fetch all posts 
export const fetchAllPosts = async()=>{
   const posts = await axios.get(BASE_URL)
   return posts.data;
}