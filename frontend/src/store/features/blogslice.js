import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("data", async () => {
  const response = await axios.get("http://localhost:5000/api/blog/getblogs", {
    withCredentials: true,
  });
  return response.data;
});




export const addBlogs = createAsyncThunk("addblogs", async (payload) => {
  const response = await axios.post(
    "http://localhost:5000/api/blog/postblog",
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const deleteBlog=createAsyncThunk('deleteblog',async(id)=>{
  const response=await axios.delete(`http://localhost:5000/api/blog/${id}`,{
    withCredentials:true
  })
  console.log(response.data)
})


const initialState = {
  isSuccess:null,
  isLoading: false,
  error: null,
  data: {},
 
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  //for promise handling (after the api callling which is either fulfilled,pending or rejected)
  extraReducers: (bulider) => {
    bulider.addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
    });

    bulider.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload; //response from the server is payload
    });
    bulider.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    bulider.addCase(addBlogs.pending, (state) => {
      state.isLoading = true;
      
    })
    bulider.addCase(addBlogs.fulfilled,(state)=>{
      state.isLoading=false;
      state.isSuccess=true;
    })
    bulider.addCase(addBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    bulider.addCase(deleteBlog.pending,(state,action)=>{
      state.isLoading=true;
    })
    bulider.addCase(deleteBlog.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.isSuccess=true;
    })
    bulider.addCase(deleteBlog.rejected,(state,action)=>{
      state.isLoading=false;
      state.error=action.error.message;
      })
  },
})

export const blogReducer = blogSlice.reducer;
