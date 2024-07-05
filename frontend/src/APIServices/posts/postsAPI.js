import axios from "axios";
const BASE_URL='http://localhost:5000/api/v1/posts'
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
   const posts = await axios.get(`${BASE_URL}/${postId}`)
   return posts.data;
}

//update post 
export const updatePostAPI = async (postData)=>{
   console.log(postData)
    const response =await axios.put(`${BASE_URL}/${postData?.postId}`,{
       title:postData.title,
       description:postData.description
    },
   {
      withCredentials:true
   });
    return response;
}
//delete 
export const deletePostAPI = async(postId)=>{
   const posts = await axios.delete(`${BASE_URL}/${postId}`,{
      withCredentials:true
   })
   return posts.data;
}
