import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchAllPosts } from '../APIServices/posts/postsAPI'
import { Link } from 'react-router-dom'
const PostsList = () => {
    const {isError,isLoading,data,error,isSuccess} = useQuery({
        queryKey:['lists-posts'],
        queryFn:fetchAllPosts
    })
  return (
    <div>
     {isLoading && <p>Loading...</p>}
     {isSuccess && <p>Posts fetched successfully</p>}
     {error && <p>{error.message}</p>}
     {data?.posts.map((post)=>{
      return(
      <div key={post?._id}>
        <h2>{post?.title}</h2>
        <p>{post?.description}</p>
        <Link to={`/posts/${post?._id}`}>
        <button>
          Edit</button></Link>
      </div>
      )
     })}

    </div>
  )
}

export default PostsList
