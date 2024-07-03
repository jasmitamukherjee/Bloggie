import axios from "axios";
const BASE_URL='http://localhost:5000/api/v1/posts'
//create post API
export const createPostAPI = async (postData)=>{
    console.log(postData)
     const response =await axios.post(`${BASE_URL}/create`,{
        description:postData.description
     });
     return response;
}

//fetch all posts 
export const fetchAllPosts = async()=>{
   const posts = await axios.get(BASE_URL)
   return posts.data;
}

//fetch post
export const fetchPost = async(postId)=>{
   const posts = await axios.get(`${BASE_URL}/${postId}`)
   return posts.data;
}

//update post 
export const updatePostAPI = async (postData)=>{
   console.log(postData)
    const response =await axios.put(`${BASE_URL}/${postData?.postId}`,{
       title:postData.title,
       description:postData.description
    });
    return response;
}
//delete 
export const deletePostAPI = async(postId)=>{
   const posts = await axios.delete(`${BASE_URL}/${postId}`)
   return posts.data;
}
