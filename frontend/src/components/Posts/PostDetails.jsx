import React from 'react'
import {useParams} from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { fetchPost } from '../../APIServices/posts/postsAPI';

const PostDetails = () => {
    //get post id
    const {postId}= useParams();
    const {isError,isLoading,data,error,isSuccess} = useQuery({
        queryKey:['post-details'],
        queryFn:()=>fetchPost(postId)
    })  
    console.log(data)
    return (
    <div>
     <h1>
        {data?.postFound.title}

     </h1>
     <p>
        {data?.postFound.description}
     </p>
    </div>
  )
}

export default PostDetails
