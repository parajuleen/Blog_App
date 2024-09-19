import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const login=createAsyncThunk('login',async(payload,{rejectWithValue})=>{
   try {
     const response= await axios.post('http://localhost:5000/api/user/login',payload,{
         withCredentials:true
     })
     return response.data
   } catch (error) {
    if(error.response.data){
        const message=error.response.data.message
        const status=error.response.status
        return rejectWithValue({message,status})
    }
    return rejectWithValue('Something went wrong')
   }
})



const initialState={
    userdata:{

    },
    loading:false,
    error:null,
    isAuth:false,
    statuscode:null,

}

const loginSlice=createSlice({
    name:"login",
    initialState,

    reducers:{
        logout:(state)=>{
            state.isAuth=false,
            state.userdata={}        
        },
        resetEror:(state)=>{
            state.error=null
            state.statuscode=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state,action)=>{
            state.loading=true
            state.error=null
            state.statuscode=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.userdata=action.payload
            state.isAuth=true
            state.statuscode=200
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.isAuth=false
            state.error=action.payload?.message || 'Invalid user credentials'
            state.statuscode=action.payload?.status
        })
    }


})

export const loginReducer=loginSlice.reducer
export const {logout,resetEror}=loginSlice.actions;


