import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://ogsoo-engine.onrender.com";

// register user
export const RegisterUser = createAsyncThunk(
  "register",
  async (data: any, thunkAPI) => {
    console.log(data)
    try {
      const res = await axios({
        method: "post",
        url: `${url}/auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });

      return res.data
    } catch (e) {
      return thunkAPI.rejectWithValue({ error: e });
    }
  }
);
// login user
export const LoginUser = createAsyncThunk(
  "login",
  async (data: any, thunkAPI) => {
    console.log(data)
    try {
      const res = await axios({
        method: "post",
        url: `${url}/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });

      return res.data
    } catch (e) {
      return thunkAPI.rejectWithValue({ error: e });
    }
  }
);

// create session
export const CreateSession = createAsyncThunk(
  "session",
  async (data: any, thunkAPI) => {
    try {
      const res = await axios({
        method: "post",
        url: `${url}/auth/session/create`,
        headers: {
          "Content-Type": "application/json",
        },
        data:{
          _id:data._id
        },
      });
      
      localStorage.setItem("token",JSON.stringify(res.data.token))
      return res.data
    } catch (e) {
      return thunkAPI.rejectWithValue({ error: e });
    }
  }

);

// user
export const GetUser:any = createAsyncThunk(
  'user',
  async (token: any, thunkAPI) => {
    try {
      const _token = token.replace(/^"(.*)"$/,`$1`)
      const response = await axios({
        method: 'get',
        url: `${url}/auth/me`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${_token}`,
        },
      });

      console.log('User data:', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  })

// users
export const GetUsers = createAsyncThunk(
  'users',
  async (token: any, thunkAPI) => {
    try {
      const _token = token.replace(/^"(.*)"$/,`$1`)
      const response = await axios({
        method: 'get',
        url: `${url}/auth/users`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${_token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }


);
