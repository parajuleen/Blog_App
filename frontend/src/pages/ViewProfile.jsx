import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../store/features/userSlice'
import Profile from '../Components/Profile'


const ViewProfile = () => {

  const{name}=useParams()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.user.user[0]);  
  const isloading=useSelector(state=>state.user.loading)


  useEffect(()=>{
    dispatch(getProfile(name))
  },[name])


  return (
    <>
   
    {isloading && <div className="border-gray-300 h-20 w-20  animate-spin rounded-full border-8 border-t-blue-600 " />}
    { data && <Profile blogs={data}/>}
    
    </>
  )
}

export default ViewProfile
