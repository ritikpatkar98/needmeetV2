import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import axios from 'axios';
const userSlice = createSlice({
    name: "user",
    initialState:{
        loading:false,
        user:[],
        isAuthenticated:false,
        error:null,
        message:null,
    },
    reducers: {
        requestRegister(state,action){
            state.loading = true;
            state.user = [];
            state.isAuthenticated = false;
            state.error = null;
        },
        successRegister(state,action){
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        failedRegister(state,action){
            state.loading = false;
            state.user = [];
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        requestLogin(state,action){
            state.loading = true;
            state.user = [];
            state.isAuthenticated = false;
            state.error = null;
        },
        successLogin(state,action){
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        failedLogin(state,action){
            state.loading = false;
            state.user = [];
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        requestLogout(state,action){
            state.loading = true;
        },
        successLogout(state,action){
            state.loading = false;
        },
        failedLogout(state,action){
            state.loading = false;
        },
        requestFetchUser(state,action){
            state.loading = true;
            state.user = [];
            state.isAuthenticated = false;
            state.error = null;
        },
        successFetchUser(state,action){
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        failedFetchUser(state,action){
            state.loading = false;
            state.user = [];
            state.isAuthenticated = false;
            state.error = action.payload;
        },
    }
})


export const userRegister = (userData) => async (dispatch) => {
    console.log(userData)
    dispatch(userSlice.actions.requestRegister());
    try {
        const response = await axios.post(`http://localhost:8080/api/auth/signup`, userData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        const data = response.data;
        dispatch(userSlice.actions.successRegister(data));
        toast.success("Registration successful");
    } catch (error) {
        dispatch(userSlice.actions.failedRegister(error.message));
        toast.error(error.response?.data?.message || "Registration failed");
    }
}


export const userLogin = ({email,password}) => async (dispatch) => {
    dispatch(userSlice.actions.requestLogin());
    try {
        const response = await axios.post(`http://localhost:8080/api/auth/login`, {email,password}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        const data = response.data;
        dispatch(userSlice.actions.successLogin(data));
        localStorage.setItem('isAuthenticated', 'true');
        toast.success("Login successful");
    } catch (error) {
        dispatch(userSlice.actions.failedLogin(error.message));
        toast.error(error.response?.data?.message || "Login failed");
    }
}

export const userLogout = () => async (dispatch) => {
    dispatch(userSlice.actions.requestLogout());
    try {
        const response = await axios.post(`http://localhost:8080/api/auth/logout`, {}, {
            withCredentials: true,
        });
        dispatch(userSlice.actions.successLogout());
        localStorage.removeItem('isAuthenticated');
        toast.success("Logout successful");
    } catch (error) {
        dispatch(userSlice.actions.failedLogout(error.message));
        toast.error("Logout failed");
    }
}



export const fetchUser = () => async (dispatch) => {
    dispatch(userSlice.actions.requestFetchUser());
    try {
        const response = await axios.get(`http://localhost:8080/api/auth/me`, {
            withCredentials: true,
        });
        const data = response.data;
        dispatch(userSlice.actions.successFetchUser(data));
        toast.success("User fetched successfully");
    } catch (error) {
        dispatch(userSlice.actions.failedFetchUser(error.message));
        toast.error("Failed to fetch user");
    }
}



export default userSlice.reducer;
