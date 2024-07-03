import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { deletePostAPI, fetchAllPosts } from '../APIServices/posts/postsAPI'
import { Link } from 'react-router-dom'
import {useMutation} from "@tanstack/react-query"

const PostsList = () => {
    const {isError,isLoading,data,error,isSuccess,refetch} = useQuery({
        queryKey:['lists-posts'],
        queryFn:fetchAllPosts
    })
    //post mutation 
  const postMutation = useMutation({
    mutationKey:['delete-post'],
    mutationFn: deletePostAPI
  })
  //delete handler 
  const deleteHandler = async (postId)=>{
   postMutation.mutateAsync(postId).then(()=>{
    refetch();

   }).catch((e)=>console.log(e))
    //refetch
  }
  return (
    <div>
     {isLoading && <p>Loading...</p>}
     {isSuccess && <p>Posts fetched successfully</p>}
     {error && <p>{error.message}</p>}
     {data?.posts.map((post)=>{
      return(
      <div key={post?._id}>
        <div
        dangerouslySetInnerHTML={{_html:post?.description}}
        />
        <Link to={`/posts/${post?._id}`}>
        <button>
          Edit</button></Link>
          <button onClick={()=>deleteHandler(post?._id)}>
          Delete
          </button>
      </div>
      )
     })}

    </div>
  )
}

export default PostsList
