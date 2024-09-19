import { useEffect } from 'react';
import React from 'react'
import Card from '../Components/Card'
import { fetchData } from "../store/features/blogslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const Posts = () => {
    const dispatch = useDispatch();
  const {blog} = useSelector((state) => state.blog.data);
  

  const handleApi = () => {
    dispatch(fetchData());
  };
  useEffect(() => {
    handleApi();
  }, []);
  return (
    <>
    <div className="container mx-auto">
        <div className="card-container grid grid-cols-3 gap-8 p-3" >
         <Card blogs={blog}/>
        </div>
    </div>
    </>
  )
}

export default Posts
