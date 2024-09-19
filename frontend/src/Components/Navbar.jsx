import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/features/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { persistor } from "../store/store";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.login.isAuth);
  const dispatch = useDispatch();
  const navigate =useNavigate()

  const handleLogout = async () => {
    dispatch(logout())
    await persistor.purge()
    const response = await axios.post(`http://localhost:5000/api/user/logout`,{},{
      withCredentials:true
    })

    navigate('/login')
    return response;
  
  }
 



  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-3xl font-bold">
            <NavLink to="/">Logo</NavLink>
          </div>

          <div className="flex items-center">
            <NavLink
              to="/home"
              className={({ isActive }) => {
                return `hover:bg-gray-200 hover:text-black hover:rounded-xl text-2xl mx-3 p-2 font-bold ${
                  isActive ? "text-orange-300" : "text-white"
                }`;
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => {
                return `
                hover:bg-gray-200 hover:text-black hover:rounded-xl
                 text-2xl mx-3 p-2 font-bold ${
                   isActive ? "text-orange-300" : "text-white"
                 }`;
              }}
            >
              Contact
            </NavLink>

            {isAuthenticated? (
              <NavLink
                to="/posts"
                className={({ isActive }) => {
                  return `
                  hover:bg-gray-200 hover:text-black hover:rounded-xl p-2
                   text-2xl mx-3 font-bold ${
                     isActive ? "text-orange-300" : "text-white"
                   }`;
                }}
              >
                Get Posts
              </NavLink>
            ) : (
              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  return `hover:bg-gray-200 hover:text-black hover:rounded-xl hover:rounded-xl p-2
                 text-2xl mx-3 font-bold ${
                   isActive ? "text-orange-300" : "text-white"
                 }`;
                }}
              >
                SignUp
              </NavLink>
            )}

            {isAuthenticated ? (
              <NavLink
                to="/create"
                className={({ isActive }) => {
                  return `hover:bg-gray-200 hover:text-black hover:rounded-xl p-2
                 text-2xl mx-3 font-bold ${
                   isActive ? "text-orange-300" : "text-white"
                 }`;
                }}
              >
                Add Posts
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return `
                  hover:bg-gray-200 hover:text-black hover:rounded-xl p-2
                   text-2xl mx-3 font-bold ${
                     isActive ? "text-orange-300" : "text-white"
                   }`;
                }}
              >
                Login
              </NavLink>
            )}
            {isAuthenticated && <NavLink
                to="/profile"
                className={({ isActive }) => {
                  return `
                  hover:bg-gray-200 hover:text-black hover:rounded-xl p-2
                   text-2xl mx-3 font-bold ${
                     isActive ? "text-orange-300" : "text-white"
                   }`;
                }}
              >
                Profile
              </NavLink>}

            {isAuthenticated && (
              <button className="bg-red-500 hover:bg-red-400 text-white text-2xl font-bold py-2 px-4 border-blue-700 hover:border-blue-500 rounded-full" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
