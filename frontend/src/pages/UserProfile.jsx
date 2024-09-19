import React, { useEffect } from "react";
import { getProfile } from "../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../Components/Profile";

const UserProfile = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.user[0]);
  const isloading=useSelector(state=>state.user.loading)

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
    
      
      {isloading && <div className="border-gray-300 h-20 w-20  animate-spin rounded-full border-8 border-t-blue-600 " />}
      {data && <Profile blogs={data}/>}      
  
    
    
    </>
  );
};

export default UserProfile;
