import axios from "axios";
const BASE_URL='https://backend-bloggie.onrender.com/api/v1/posts'
//create post API
export const createPostAPI = async (postData)=>{
    console.log(postData)
     const response =await axios.post(`${BASE_URL}/create`,
        postData,
        {
         withCredentials:true
        }
     );
     return response;
}

//fetch all posts 
export const fetchAllPosts = async(filters)=>{
   console.log(filters)
   const posts = await axios.get(BASE_URL,{
      params:filters
   })
   return posts.data;
}

//fetch post
export const fetchPost = async(postId)=>{
   const posts = await axios.get(`${BASE_URL}/${postId}`,{
      withCredentials:true
   })
   return posts.data;
}

//update post 
export const updatePostAPI = async ({formData,postId})=>{
    const response =await axios.put(`${BASE_URL}/${postId}`,
      formData
    ,
   {
      withCredentials:true
   });
    return response.data;
}
//delete 
export const deletePostAPI = async(postId)=>{
   const posts = await axios.delete(`${BASE_URL}/${postId}`,{
      withCredentials:true
   })
   return posts.data;
}

//!like post api
export const likePostAPI = async (postId) => {
   const response = await axios.put(
     `${BASE_URL}/likes/${postId}`,
     {},
     {
       withCredentials: true,
     }
   );
   return response.data;
 };
 //!dislike post api
 export const dislikePostAPI = async (postId) => {
   const response = await axios.put(
     `${BASE_URL}/dislikes/${postId}`,
     {},
     {
       withCredentials: true,
     }
   );
   return response.data;
 };