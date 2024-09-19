import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const Readblogs = () => {
  const navigate = useNavigate();
  const {id}=useParams()
  
  const [post,setPost]=useState()

 const fetchBlog=async(id)=>{
  try {
    const response =await axios.get(`http://localhost:5000/api/blog/${id}`,{
      withCredentials:true
    })
    setPost(response.data.blog)
  } catch (error) {
    console.log(`Something went wrong on getting blog`,error)
  }
 }

 useEffect(()=>{
  fetchBlog(id)
 },[id])



  return (
    <>
    {
      post && (
        <div className="container mx-auto h-auto bg-white px-4">
      <div className="top-section flex flex-col mb-2 py-2 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <img
          className="w-16 h-16 rounded-full shadow-md shadow-black"
          alt="Profile"
          src={post.author.profileImage}
        />
        <span className="text-slate-600 inline-block hover:cursor-pointer hover:underline hover:text-black " 
        onClick={()=>{
          navigate(`/profile/${post.author.name}`)
        }}
        >
          {post.author.name}
        </span>
         <span className="text-slate-600 inline-block  ">
         {moment(post.createdAt).format("MMM D, YYYY")}
         </span>
      </div>
      <div className="image-container mb-2">
        <img
          className=" w-full object-cover"
          src={post.coverImage}
          alt="coverimage"
        />
      </div>
      <p className="text-2xl font-serif text-justify">{post.description}</p>
    </div>
      )
    }
    
    
    </>
  );
};

export default Readblogs;
