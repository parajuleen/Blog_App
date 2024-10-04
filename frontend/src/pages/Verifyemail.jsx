import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verifyemail = () => {
  const [otp, setOtp] = useState("");
  const[error,setError]=useState('')
  const[status,setStatus]=useState(false)
  const [message,setMessage]=useState('')
  const navigate=useNavigate()

  const submitOtp=async()=>{

    try {
        const response= await axios.post('http://localhost:5000/api/user/verify-email',{otp},{
            withCredentials:true
        })
        if(response.data){
            setStatus(true)
            setMessage(response.data.message)
            setError('')        }
        
    } catch (error) {
        setError(error.response.data.message)
    }
    setOtp('')
  }

const requestOtp=async()=>{
  try {
    const response = await axios.get('http://localhost:5000/api/user/resendOtp',{
      withCredentials:true
    })
    if(response.data){
      setMessage(response.data.message)
      setError('')
    }
    
  } catch (error) {
    setError(error.response.data.message)
    
  }
}

  useEffect(()=>{
    if(status){
      const intervalId= setInterval(() => {
            navigate('/login')
            
        },1000)
        return () => clearInterval(intervalId);
    }

  },[status])

  return (
    <>
    
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
        {message && <p className="text-xl text-center text-green-700">{message}</p>}
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Enter OTP
          </h2>
          
          {error && <p className="text-xl text-center mb-2 text-red-700">{error}</p>}
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              maxLength={4}
              onChange={(e) => setOtp(e.target.value)}
              required
            
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={submitOtp}
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={requestOtp}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verifyemail;
