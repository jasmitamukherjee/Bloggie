import React, { useState } from 'react'
import {useFormik} from "formik";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css";
import {useMutation} from "@tanstack/react-query"
import { createPostAPI } from '../../APIServices/posts/postsAPI';
import ReactQuill from "react-quill";
const CreatePost = () => {
  const [description,setDescription] = useState("")
  //post mutation 
  const postMutation = useMutation({
    mutationKey:['create-post'],
    mutationFn: createPostAPI
  })
  const formik= useFormik({
    initialValues:{
     
      description:""
    },
    validationSchema:Yup.object({
      description:Yup.string().required("Description is required"),

    }),
    onSubmit:(values)=>{
      const postData={
        description:values.description
      }
      postMutation.mutate(postData);
    }
  });
//  get loading state
const isLoading = postMutation.isLoading
const isError = postMutation.isError
const isSuccess =postMutation.isSuccess
const error = postMutation.error;
const errorMsg =postMutation?.error?.response?.data?.message;

return (
  
  <div className='flex items-center justify-center'>
    <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4'>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>
        Add New Post
      </h2>
      <form onSubmit={formik.handleSubmit} className='space-y-6'>
        <div>
          <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <ReactQuill 
       value={formik.values.description}
       onChange={(value)=>{
        setDescription(value)
        formik.setFieldValue('description',value)
       }}
       />
        {formik.touched.description && formik.errors.description      
        && (<span style={{color:"red"}}>
          {formik.errors.description}
          </span>)}

        </div>
        <label
        htmlFor='category'
        className='block text-sm font-medium text-gray-700'>
          Category
        </label>
        <div className='flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg'>
          <label
          htmlFor='images'
          className='block text-sm font-medium text-gray-700 mb-2'>
            Upload Image
          </label>
          <div className='flex justify-center items-center w-full'>
            <input
            id="images"
            type="file"
            name="image"
            accept='image/*'
            className='hidden'
            />
            <label 
            htmlFor='images'
            className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600'>
              Choose a file
            </label>

          </div>
        </div>
        <button 
        type='submit'
        className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focu:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          Add Post
        </button>
      </form>
    </div>
  </div>
  )
}

export default CreatePost
