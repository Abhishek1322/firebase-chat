import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allRecentOrder: [],
  latestOrder: false,
  allBookingRequests: [],
};

export const chefSilce = createSlice({
  name: "chef",
  initialState,
  reducers: {
    acceptBooking: (state) => {
      state.loading = true;
    },
    setAcceptBooking: (state, action) => {
      state.loading = false;
    },
    getBookingDetail: (state) => {
      state.loading = true;
    },
    setGetBookingDetail: (state, action) => {
      state.loading = false;
    },
    getBookingRequests: (state) => {
      state.loading = true;
    },
    setGetBookingRequests: (state, action) => {
      state.loading = false;
      state.allBookingRequests = action.payload;
    },
    getLatestOrder: (state, action) => {
      state.latestOrder = action.payload;
    },
    confirmResendOtp: (state) => {
      state.loading = true;
    },
    setConfirmResendOtp: (state, action) => {
      state.loading = false;
    },

    confirmOrderOtp: (state) => {
      state.loading = true;
    },
    setConfirmOrderOtp: (state, action) => {
      state.loading = false;
    },

    getSingleOrderDetail: (state) => {
      state.loading = true;
    },
    setGetSingleOrderDetail: (state, action) => {
      state.loading = false;
    },
    acceptOrder: (state) => {
      state.loading = true;
    },
    setAcceptOrder: (state, action) => {
      state.loading = false;
    },
    getRecentOrder: (state) => {
      state.loading = true;
    },
    setGetRecentOrder: (state, action) => {
      state.loading = false;
      state.allRecentOrder = action.payload;
    },
    onErrorStopLoadChef: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getRecentOrder,
  setGetRecentOrder,
  acceptOrder,
  setAcceptOrder,
  onErrorStopLoadChef,
  getSingleOrderDetail,
  setGetSingleOrderDetail,
  confirmOrderOtp,
  setConfirmOrderOtp,
  confirmResendOtp,
  setConfirmResendOtp,
  getLatestOrder,
  getBookingRequests,
  setGetBookingRequests,
  getBookingDetail,
  setGetBookingDetail,
  acceptBooking,
  setAcceptBooking,
} = chefSilce.actions;

export default chefSilce.reducer;
