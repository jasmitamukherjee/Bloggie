import React from 'react'
import {useParams} from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { fetchPost, updatePostAPI } from '../../APIServices/posts/postsAPI';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMutation} from "@tanstack/react-query"

const UpdatePost = () => {
   
    //get post id
    const {postId}= useParams();
    const {data} = useQuery({
        queryKey:['post-details'],
        queryFn:()=>fetchPost(postId)
    })  
    console.log(data)
    //post mutation 
  const postMutation = useMutation({
   mutationKey:['update-post'],
   mutationFn: updatePostAPI
 })
 const formik= useFormik({
   initialValues:{
     title:data?.postFound?.title || "",
     description:data?.postFound?.description || ""
   },
   enableReinitialize:true,
   validationSchema:Yup.object({
     title:Yup.string().required("Title is required"),
     description:Yup.string().required("Description is required"),

   }),
   onSubmit:(values)=>{
     const postData={
       title:values.title,
       description:values.description,
       postId
     }
     postMutation.mutate(postData);
   }
 });
//  get loading state
const isLoading = postMutation.isLoading
const isError = postMutation.isError
const isSuccess =postMutation.isSuccess
const error = postMutation.error;
    return (
    <div>
     <h1>
        You are editting : {data?.postFound.title}

     </h1>
     
     <div>
        {isLoading && <p>Loading ...</p>}
        {isSuccess && <p>Post updated successfully</p>}
        {isError && <p>{error.message}</p>}



      <form onSubmit={formik.handleSubmit}>

        <input type="text" name="title" placeholder='Enter title'
        {...formik.getFieldProps("title")}

        />
        {formik.touched.title && formik.errors.title 
        
        && <span style={{color:"red"}}>
          {formik.errors.title}
          </span>}
        <input type="text" name="description" placeholder='Enter desciption'
        {...formik.getFieldProps("description")}
        />
        {formik.touched.description && formik.errors.description      
        && <span style={{color:"red"}}>
          {formik.errors.description}
          </span>}
        <button type="submit">
          Update
        </button>


      </form>
    </div>
    </div>
  )
}

export default UpdatePost
