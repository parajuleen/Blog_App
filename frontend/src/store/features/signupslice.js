import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const registerUser=createAsyncThunk('register',async(data,{rejectWithValue})=>{

  try {
      const response= await axios.post('http://localhost:5000/api/user/register',data)
      console.log(response.data)
      return response.data
  } catch (error) {

    const message=error.response.data
    const status=error.response.status

    return rejectWithValue({status,message})
    
  }
    
})

const initialState={
    loading:false,
    error:null,
    signupData:null,
    isSuccess:false,
    status:null
}



const signupSlice=createSlice({
    name:'signUp',
    initialState,
    reducers:{
        resetSignup:(state)=>{
            state.loading=false,
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state,actions)=>{
            state.loading=true
        })
        .addCase(registerUser.fulfilled,(state,actions)=>{
            state.loading=false
            state.signupData=actions.payload
            state.isSuccess=true
            
        })
        .addCase(registerUser.rejected,(state,actions)=>{
            state.error=actions.payload.message
            state.loading=false
            state.status=actions.payload.status
        })
    }
})

export const registerReducer=signupSlice.reducer
export const {resetSignup}=signupSlice.actions