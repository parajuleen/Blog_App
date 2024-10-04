import React, { useEffect, useState } from "react";
import { login,resetEror } from "../store/features/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link,Navigate} from "react-router-dom";


const Login = () => {
  const [password, setPassword] = useState("password");
  const dispatch=useDispatch()
  const isAuthenticated=useSelector(state=>state.login.isAuth)
 const {error,statuscode,loading}=useSelector(state=>state.login)




  const [formvalues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formvalues,
      [name]: value,
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(login(formvalues))
    
  }
  useEffect(()=>{
    dispatch(resetEror())
  },[])

  return (
    <>
    {isAuthenticated && <Navigate to='/'/>}
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
    {loading && <div className="border-gray-300 h-10 w-10  animate-spin rounded-full border-8 border-t-blue-600 relative top-60" />}

      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg ">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Login
        </h2>
        
        { statuscode === 400 &&  <p className="text-red-500 text-xl text-center m-2">{error}</p> }
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formvalues.email}
              onChange={handleInput}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           {
            statuscode === 404 ?
            <p className="text-red-500 text-sm mt-2">{error}</p> :
            null
           }
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type={password}
              id="password"
              name="password"
              value={formvalues.password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {
            statuscode === 401 ?
            <p className="text-red-500 text-sm mb-4">{error}</p>:""
          }
            <input
                type="checkbox"
                onClick={(e) => {
                  if (e.target.checked) {
                    setPassword("text");
                  } else {
                    setPassword("password");
                  }
                }}
              />
              Show Password
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {
            statuscode === 403 &&
            <div className="message flex flex-col items-center">
              <p className="text-red-500 text-md mt-2">{error}</p> 
              <Link to='/verify-email' className="text-xl font-bold text-blue-400 mx-2 hover: text-blue-600 hover:cursor-pointer underline">Verify</Link>
            </div>
            
           }
      </div>
     
    </div>

    </>
  );
};

export default Login;
