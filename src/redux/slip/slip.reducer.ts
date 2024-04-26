import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://ogsoo-engine.onrender.com"

export const LatestSlip:any = createAsyncThunk("latest/slip",async(token:any,thunkAPI) => {
    try{
        const res = await axios(
        {
            method:"get",
            url:`${url}/slip/latest`,
            headers:{
                "Content-Type":"application/json",
            }
        }
    )

    return res.data
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue({error:e})
    }
});


export const GetAllGroupedSlips:any = createAsyncThunk("grouped/slips", async (token:any,thunkAPI) => {
    try{
        const res = await axios(
        {
            method:"get",
            url:`${url}/slip/allgrouped`,
            headers:{
                "Content-Type":"application/json",
            }
        }
    )

    return res.data
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue({error:e})
    }
})
export const GetAllSlips:any = createAsyncThunk("all/slips", async (token:any,thunkAPI) => {
    try{
        const _token = token?.replace(/^"(.*)"$/, "$1")
        const res = await axios(
        {
            method:"get",
            url:`${url}/slip/all`,
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${_token}`
            }
        }
    )

    return res.data
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue({error:e})
    }
})
export const DeleteSlip:any = createAsyncThunk("delete/slip", async (data:any,thunkAPI) => {
    try{
        const {token,_id} = data
        const _token = token?.replace(/^"(.*)"$/, "$1")
        const _url = `${url}/slip/delete/${_id}`
        console.log(_url)
        const res = await axios(
        {
            method:"delete",
            url:_url,
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${_token}`
            }
        }
    )

    return res.data
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue({error:e})
    }
})
export const CreateSlip:any = createAsyncThunk("create/slip", async (data:any,thunkAPI) => {
    try{
        const {token,slip} = data
        const _token = token?.replace(/^"(.*)"$/, "$1")
        const res = await axios(
        {
            method:"post",
            url:`${url}/slip/create`,
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${_token}`
            },data:{
                slip
            }
        }
    )

    return res.data
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue({error:e})
    }
})
export const UpdateSlip:any = createAsyncThunk("update/slip", async (data:any,thunkAPI) => {
    try{
        const {token,_id,slip} = data
        const _token = token?.replace(/^"(.*)"$/, "$1")
        const res = await axios(
        {
            method:"put",
            url:`${url}/slip/update/${_id}`,
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${_token}`
            },data:{slip}
        }
    )

    return res.data
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue({error:e})
    }
})
