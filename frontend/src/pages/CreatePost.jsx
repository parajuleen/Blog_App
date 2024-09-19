import React, { useState } from 'react';
import { addBlogs } from '../store/features/blogslice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CreatePost = () => {
  const dispatch=useDispatch()
  const {isLoading,isSuccess}=useSelector(state=>state.blog)
 


  const [blogs,setBlogs]=useState({
    title: "",
    description:"",
    coverImage:""
  })

  const handleBlogs=(e)=>{
  const{name,value,files}=e.target
  setBlogs({
    ...blogs,
    [name]:files ?files[0]:value
  })
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('title',blogs.title)
    formdata.append('description',blogs.description)
    formdata.append('coverImage',blogs.coverImage)


    dispatch(addBlogs(formdata))
    setBlogs({
      title: "",
      description: "",
      coverImage: ""
    })

  }


  return (
    <>
    
    
    {isLoading && <div className="border-gray-300 h-20 w-20  mx-auto animate-spin rounded-full border-8 border-t-blue-600 top-64 relative " />}
    {isSuccess && <Navigate to='/posts'/>}
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg max-h-screen mt-2 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload a Blog</h1>
      <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title of the blog"
            onChange={handleBlogs}
            value={blogs.title}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-medium mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter the description of the blog"
            rows="4"
            value={blogs.description}
            onChange={handleBlogs}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="coverImage" className="text-lg font-medium mb-1">Cover Image</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept='image/*'
            onChange={handleBlogs}
            className="border border-gray-300 rounded-lg p-2 file:border-0 file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default CreatePost;
