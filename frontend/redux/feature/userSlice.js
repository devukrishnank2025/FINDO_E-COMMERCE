import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { useReducer } from "react";



export const addUser = createAsyncThunk(
    "addProduct"
    , async (data) => {
        const response = await axios.post(`http://localhost:5000/api/auth/register`, data);
        console.log(`http://localhost:5000/api/auth/register`);
        console.log(response.data);
        return response.data;
    })

const userReducer = createSlice({
    name:'userReducer',
    initialState:{
        User:[],
        loading: false,
        error: null,
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(addUser.pending,(state,action)=>{
            state.loading= true;
        })
        .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.User.push(action.payload.file)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export default userReducer.reducer;