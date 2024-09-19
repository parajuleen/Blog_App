import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {deleteBlog} from '../store/features/blogslice'
import { removePost } from "../store/features/userSlice";

const Profile = (props) => {
  const blogs = props.blogs.blog_info;
  const { profileImage, name,email } = props.blogs;
  const activeUser = useSelector((state) => state.login.userdata.user.name);

 const dispatch=useDispatch()
  const navigate = useNavigate();

  return (
    <>
    <div className="profile-container container mx-auto p-3 bg-slate-100">
      <div className="container mx-auto py-5 h-full min-h-98">
        <div className="flex justify-center items-center h-full">
          <div className="w-full">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-400 to-purple-500 text-center text-white flex flex-col items-center justify-center p-5">
                  <img
                    src={profileImage}
                    alt="profileimage"
                    className="rounded-full w-60 h-60 mb-5"
                  />
                  <h5 className="text-lg font-semibold">{name}</h5>
                </div>
                <div className="w-full md:w-2/3 p-6">
                  <h6 className="text-lg font-semibold">Information</h6>
                  <hr className="my-4" />
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                      <h6 className="text-sm font-medium">Email</h6>
                      <p className="text-gray-600">{email}</p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <h6 className="text-sm font-medium">Phone</h6>
                      <p className="text-gray-600">123 456 789</p>
                    </div>
                  </div>
                  <h6 className="text-lg font-semibold mt-4">Articles</h6>
                  <hr className="my-4" />
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                      <h6 className="text-sm font-medium">Recent</h6>
                      <p className="text-gray-600">Lorem ipsum</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <h1 className=" text-gray-900 font-bold text-3xl m-2"> Published Articles</h1>
    {
      blogs.length >0 ? <div className="card-container grid grid-cols-3 gap-8 p-2 ">
      {blogs?.map((blogs) => {
        return (
          <div
            className="w-full rounded-md shadow-md shadow-black-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50 bg-white"
            key={blogs._id}
          >
            <img
              className="aspect-video bg-cover w-full rounded-t-md min-h-40"
              src={blogs.coverImage}
              alt="Cover"
            />
            <div className="p-4">
              <p className="font-semibold text-xl h-24 max-h-48">
                {blogs.title}
              </p>{" "}
              <p className="font-normal text-gray-700 text-justify line-clamp-5">
                {blogs.description}
              </p>
              <div className="mt-5">
                <img
                  className="w-16 h-16 rounded-full shadow-md shadow-black"
                  alt="Profile"
                  src={profileImage}
                />

                <p className="text-lg font-semibold text-gray-800 inline-block mx-1 hover:cursor-pointer hover:underline hover:text-blue-800">
                  {name}
                </p>

                <p className="text-gray-600">
                  Published On:{" "}
                  <span>{moment(blogs.createdAt).format("MMM D, YYYY")}</span>{" "}
                </p>

                <div className="button-container flex justify-between items-center">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      navigate(`/posts/${blogs._id}`);
                    }}
                  >
                    Read More
                    <svg
                      className="rtl:rotate-180 w-3 h-3 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>

                  {activeUser === name ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={28}
                      height={28}
                      color={"#000000"}
                      fill={"none"}
                      className="
          hover:cursor-pointer
          hover:fill-gray-500
          "
                      onClick={() => {
                        if (name === activeUser) {
                          if(confirm("Do you confirm to delete post ?")){
                              dispatch(deleteBlog(blogs._id))
                              dispatch(removePost(blogs._id))
                             
                          }

                        }
                      }}
                    >
                      <path
                        d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.5 16.5L9.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14.5 16.5L14.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
    :
    <h1 className=" font-semi-bold text-2xl m-2">No articles posted </h1>
  
    }
      

    </div>
      
   
    </>
  );
};

export default Profile;
