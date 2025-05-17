import { createSlice } from '@reduxjs/toolkit'
import { request } from 'express';

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
            state,loading = false;
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
        }
    }
})


export const userRegister = (data) => async (dispatch) => {
    dispatch(userSlice.actions.requestRegister());
    try {
        const response = await axios.post(``,data, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        if (response.ok) {
            dispatch(userSlice.actions.successRegister(data));
            toast.sucess("Registration successful");
        }
    } catch (error) {
        dispatch(userSlice.actions.failedRegister(error.message));
        toast.error("Registration failed");
    }
}


export const userLogin = (data) => async (dispatch) => {
    dispatch(userSlice.actions.requestLogin());
    try {
        const response = await axios.post(``,data, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(userSlice.actions.successLogin(data));
            toast.sucess("Login successful");
        }
    } catch (error) {
        dispatch(userSlice.actions.failedLogin(error.message));
        toast.error("Login failed");
    }
}

export const userLogout = () => async (dispatch) => {
    dispatch(userSlice.actions.requestLogout());
    try {
        const response = await axios.get(``,{
            withCredentials: true,
        });

        if (response.ok) {
            dispatch(userSlice.actions.successLogout());
            toast.sucess("Logout successful");
        }
    } catch (error) {
        dispatch(userSlice.actions.failedLogout(error.message));
        toast.error("Logout failed");
    }
}

export default userSlice.reducer;