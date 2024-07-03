import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { deletePostAPI, fetchAllPosts } from '../../APIServices/posts/postsAPI'
import { Link } from 'react-router-dom'
import {useMutation} from "@tanstack/react-query"
const PostsList = () => {
    const {isError, isLoading, data, error, refetch} = useQuery({
        queryKey: ['lists-posts'],
        queryFn: fetchAllPosts
    });
    // post mutation 
    const postMutation = useMutation({
        mutationKey: ['delete-post'],
        mutationFn: deletePostAPI
    });
    // delete handler 
    const deleteHandler = async (postId) => {
        postMutation.mutateAsync(postId).then(() => {
            refetch();
        }).catch((e) => console.log(e));
    };

    return (
        <div className="min-h-screen">
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            <section className='overflow-hidden'>
                <div className='container mx-auto px-4 lg:px-8'>
                    <h1 className='text-4xl lg:text-6xl font-bold font-heading mb-6 mt-16'>
                        Bloggie
                    </h1>
                    <h2 className='text-4xl font-bold font-heading mb-10'>
                        Latest articles
                    </h2>
                    <div className='flex flex-wrap mb-32 -mx-4'>
                        {data?.posts?.map((post) => (
                            <div key={post._id} className='w-full md:w-1/2 lg:w-1/3 p-4'>
                                <Link to={`/posts/${post._id}`}>
                                    <div className='bg-white border border-gray-100 hover:border-orange-500 transition duration-200 rounded-2xl h-full p-3'>
                                        <div className='relative' style={{height: 200}}>
                                            <div className='absolute top-0 left-0 z-10'></div>
                                            <div className='absolute bottom-0 right-0 z-10'></div>
                                            {/* <img
                                                className='absolute inset-0 w-full h-full object-cover rounded-2xl'
                                                src={post?.img?.path}
                                                alt
                                            /> */}
                                        </div>
                                        <div className="rendered-html-content mb-2"
                                             dangerouslySetInnerHTML={{__html: post?.description}}
                                        />
                                        <div className='flex flex-wrap items-center gap-3'>
                                            <p className='text-gray-500 text-sm'>
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </p>
                                            <svg xmlns='http://www.w3.org/200/svg' width={4} height={4}
                                                 viewBox='0 0 4 4' fill='none'>
                                                <circle cx={2} cy={2} r={2} fill="#b8b8b8"/>
                                            </svg>
                                            <div className='py-1 px-2 rounded-md border border-gray-100 font-medium text-gray-700 inline-block'>
                                                {/* {post?.category?.categoryName} */}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PostsList;
