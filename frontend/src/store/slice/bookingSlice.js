import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        loading: false,
        bookings: [],
        booking: null,
        error: null,
        message: null,
    },
    reducers: {
        requestCreateBooking(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successCreateBooking(state, action) {
            state.loading = false;
            state.bookings.push(action.payload);
            state.error = null;
            state.message = "Booking created successfully";
        },
        failedCreateBooking(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        requestFetchUserBookings(state) {
            state.loading = true;
            state.error = null;
        },
        successFetchUserBookings(state, action) {
            state.loading = false;
            state.bookings = action.payload;
            state.error = null;
        },
        failedFetchUserBookings(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        requestFetchProviderBookings(state) {
            state.loading = true;
            state.error = null;
        },
        successFetchProviderBookings(state, action) {
            state.loading = false;
            state.bookings = action.payload;
            state.error = null;
        },
        failedFetchProviderBookings(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        requestUpdateBookingStatus(state) {
            state.loading = true;
            state.error = null;
        },
        successUpdateBookingStatus(state, action) {
            state.loading = false;
            const updatedBooking = action.payload;
            const index = state.bookings.findIndex(b => b._id === updatedBooking._id);
            if (index !== -1) {
                state.bookings[index] = updatedBooking;
            }
            state.error = null;
            state.message = "Booking status updated";
        },
        failedUpdateBookingStatus(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        requestCancelBooking(state) {
            state.loading = true;
            state.error = null;
        },
        successCancelBooking(state, action) {
            state.loading = false;
            const cancelledBookingId = action.payload._id;
            state.bookings = state.bookings.filter(b => b._id !== cancelledBookingId);
            state.error = null;
            state.message = "Booking cancelled successfully";
        },
        failedCancelBooking(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        requestSubmitRating(state) {
            state.loading = true;
            state.error = null;
        },
        successSubmitRating(state, action) {
            state.loading = false;
            state.message = "Rating submitted successfully";
            state.error = null;
        },
        failedSubmitRating(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        requestFetchAllBookings(state) {
            state.loading = true;
            state.error = null;
        },
        successFetchAllBookings(state, action) {
            state.loading = false;
            state.bookings = action.payload;
            state.error = null;
        },
        failedFetchAllBookings(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        // New reducers for single booking fetch and clear
        requestFetchBookingById(state) {
            state.loading = true;
            state.error = null;
            state.booking = null;
        },
        successFetchBookingById(state, action) {
            state.loading = false;
            state.booking = action.payload;
            state.error = null;
        },
        failedFetchBookingById(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.booking = null;
        },
        clearBooking(state) {
            state.booking = null;
            state.error = null;
            state.message = null;
            state.loading = false;
        },
    }
});

// Async thunks

export const createBooking = (bookingData) => async (dispatch) => {
    dispatch(bookingSlice.actions.requestCreateBooking());
    try {
        const response = await axios.post('http://localhost:8080/api/bookings', bookingData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        dispatch(bookingSlice.actions.successCreateBooking(response.data));
        toast.success("Booking created successfully");
    } catch (error) {
        dispatch(bookingSlice.actions.failedCreateBooking(error.message));
        toast.error(error.response?.data?.message || "Failed to create booking");
    }
};

export const fetchUserBookings = (userId, page = 1, limit = 10) => async (dispatch) => {
    dispatch(bookingSlice.actions.requestFetchUserBookings());
    try {
        const response = await axios.get(`http://localhost:8080/api/bookings/user/${userId}?page=${page}&limit=${limit}`, {
            withCredentials: true,
        });
        dispatch(bookingSlice.actions.successFetchUserBookings(response.data.bookings));
        toast.success("User bookings fetched");
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to fetch user bookings";
        dispatch(bookingSlice.actions.failedFetchUserBookings(errorMessage));
        toast.error(errorMessage);
    }
};

export const fetchProviderBookings = (providerId, page = 1, limit = 10) => async (dispatch) => {
    dispatch(bookingSlice.actions.requestFetchProviderBookings());
    try {
        const response = await axios.get(`http://localhost:8080/api/bookings/provider/${providerId}?page=${page}&limit=${limit}`, {
            withCredentials: true,
        });
        dispatch(bookingSlice.actions.successFetchProviderBookings(response.data.bookings));
        toast.success("Provider bookings fetched");
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to fetch provider bookings";
        dispatch(bookingSlice.actions.failedFetchProviderBookings(errorMessage));
        toast.error(errorMessage);
    }
};

export const updateBookingStatus = (bookingId, status) => async (dispatch) => {
    dispatch(bookingSlice.actions.requestUpdateBookingStatus());
    try {
        const response = await axios.patch(`http://localhost:8080/api/bookings/booking/status/${bookingId}`, { status }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        dispatch(bookingSlice.actions.successUpdateBookingStatus(response.data));
        toast.success("Booking status updated");
    } catch (error) {
        dispatch(bookingSlice.actions.failedUpdateBookingStatus(error.message));
        toast.error("Failed to update booking status");
    }
};

export const cancelBooking = (bookingId) => async (dispatch) => {
    dispatch(bookingSlice.actions.requestCancelBooking());
    try {
        const response = await axios.delete(`http://localhost:8080/api/bookings/booking/delete/${bookingId}`, {
            withCredentials: true,
        });
        dispatch(bookingSlice.actions.successCancelBooking(response.data.booking));
        toast.success("Booking cancelled");
    } catch (error) {
        dispatch(bookingSlice.actions.failedCancelBooking(error.message));
        toast.error("Failed to cancel booking");
    }
};

export const submitRating = (ratingData) => async (dispatch) => {
    dispatch(bookingSlice.actions.requestSubmitRating());
    try {
        const response = await axios.post('http://localhost:8080/api/bookings/ratings', ratingData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        dispatch(bookingSlice.actions.successSubmitRating(response.data));
        toast.success("Rating submitted");
    } catch (error) {
        dispatch(bookingSlice.actions.failedSubmitRating(error.message));
        toast.error("Failed to submit rating");
    }
};

export const fetchAllBookings = (status, page = 1, limit = 10) => async (dispatch) => {
    dispatch(bookingSlice.actions.requestFetchAllBookings());
    try {
        const url = status ? `http://localhost:8080/api/bookings?status=${status}&page=${page}&limit=${limit}` : `http://localhost:8080/api/bookings?page=${page}&limit=${limit}`;
        const response = await axios.get(url, {
            withCredentials: true,
        });
        dispatch(bookingSlice.actions.successFetchAllBookings(response.data.bookings));
        toast.success("All bookings fetched");
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to fetch bookings";
        dispatch(bookingSlice.actions.failedFetchAllBookings(errorMessage));
        toast.error(errorMessage);
    }
};

// New async thunk for fetching single booking by id
export const fetchBookingById = (id) => async (dispatch) => {
    dispatch(bookingSlice.actions.requestFetchBookingById());
    try {
        const response = await axios.get(`http://localhost:8080/api/bookings/booking/${id}`, {
            withCredentials: true,
        });
        dispatch(bookingSlice.actions.successFetchBookingById(response.data));
    } catch (error) {
        dispatch(bookingSlice.actions.failedFetchBookingById(error.message));
        toast.error("Failed to fetch booking details");
    }
};

// Export clearBooking action
export const clearBooking = () => (dispatch) => {
    dispatch(bookingSlice.actions.clearBooking());
};

export default bookingSlice.reducer;
