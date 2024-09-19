import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProfile=createAsyncThunk('userprofile',async(name)=>{
    const response= await axios.get(`http://localhost:5000/api/user/getProfile/${name}`,{
        withCredentials:true
      })
    return response.data;
})






const initialState={
    user:{},
    loading:false,
    error:null
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        removePost:(state,action)=>{
            const id=action.payload
            const newState= state.user[0].blog_info.filter((blog)=>blog._id !== id)
            state.user[0].blog_info=newState
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProfile.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getProfile.fulfilled,(state,action)=>{
            state.user=action.payload
            state.loading=false

            })
        .addCase(getProfile.rejected,(state,action)=>{
            state.error=action.error.message

        })

    }
})

export const userReducer=userSlice.reducer
export const {removePost} =userSlice.actions


