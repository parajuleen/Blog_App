import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";


const Card = (props) => {
  const { blogs} = props;

const dispatch=useDispatch()
  const navigate = useNavigate();

  return (
          <>
          {blogs?.map((blogs)=>{
            return(
              <div className="w-full rounded-md shadow-md shadow-black-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50 bg-white" key={blogs._id}>
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
                    src={ blogs.author.profileImage}
                  />

                  <p
                      className="text-lg font-semibold text-gray-800 inline-block mx-1 hover:cursor-pointer hover:underline hover:text-blue-800"
                      onClick={() => {
                          navigate(`/profile/${blogs.author.name}`);
                      }}
                    >
                      {blogs.author.name}
                   
                    </p>
                    
                

                  <p className="text-gray-600">
                    Published On:{" "}
                    <span>{moment(blogs.createdAt).format("MMM D, YYYY")}</span>{" "}
                
                  </p>
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
                </div>
              </div>
            </div>
            )

          })}
           
          </>
  );
};

export default Card;
