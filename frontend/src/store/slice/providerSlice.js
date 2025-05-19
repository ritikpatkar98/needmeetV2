import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  providers: [],
  allProvider :  [],
  loading: false,
  error: null,
};

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    requestGetAllProviders(state, action) {
      state.allProvider = [];
    },
    successGetAllProviders(state, action) {
      state.allProvider = action.payload;
    },
    failedGetAllProviders(state, action) {
      state.allProvider = [];
    },
    requestFetchProviders(state) {
      state.loading = true;
      state.error = null;
    },
    successFetchProviders(state, action) {
      state.loading = false;
      state.providers = action.payload;
      state.error = null;
    },
    failedFetchProviders(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  requestFetchProviders,
  successFetchProviders,
  failedFetchProviders,
  requestGetAllProviders,
  successGetAllProviders,
  failedGetAllProviders,
} = providerSlice.actions;



export const fetchProvidersByServiceType = (serviceType) => async (dispatch) => {
  dispatch(requestFetchProviders());
  try {
    const response = await axios.get(`http://localhost:8080/api/providers/service/${serviceType}`);
    console.log(response.data);
    dispatch(successFetchProviders(response.data));
    toast.success(`Providers for ${serviceType} fetched successfully`);
  } catch (error) {
    dispatch(failedFetchProviders(error.message));
    toast.error(error.response?.data?.message || `Failed to fetch providers for ${serviceType}`);
  }
};



export const  fetchProviders = () => async (dispatch) => {
  dispatch(requestGetAllProviders());
  try {
    const response = await axios.get('http://localhost:8080/api/auth/all/provider',{
      withCredentials: true,
    });
    console.log(response.data);
    dispatch(successGetAllProviders(response.data));
    toast.success(`Providers fetched successfully`);
  } catch (error) {
    dispatch(failedGetAllProviders(error.message));
    toast.error(error.response?.data?.message || `Failed to fetch providers`);
  }
}

export default providerSlice.reducer;
