import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userslice'

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;