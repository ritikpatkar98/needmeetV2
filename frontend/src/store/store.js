import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import providerReducer from './slice/providerSlice'
import bookingReducer from './slice/bookingSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        provider: providerReducer,
        booking: bookingReducer
    }
});

export default store;
