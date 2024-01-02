import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  address: [],
  userAddres: [],
  helperPagesData: [],
  cartData: [],
  cartCount: [],
  allOrders: [],
  bookingData: [],
  allnotifications: [],
  currentLocation: {},
  locationInfo: [],
};

export const userSilce = createSlice({
  name: "user",
  initialState,
  reducers: {
    getLocationInfo: (state) => {
      state.loading = true;
    },
    setGetLocationInfo: (state, action) => {
      state.loading = false;
      state.locationInfo = action.payload;
    },
    getCurrentLocation: (state, action) => {
      state.loading = false;
      state.currentLocation = action.payload;
    },
    getMenuRating: (state) => {
      state.loading = true;
    },
    setGetMenuRating: (state, action) => {
      state.loading = false;
    },
    menuRating: (state) => {
      state.loading = true;
    },
    setMenuRating: (state, action) => {
      state.loading = false;
    },
    clearNotification: (state) => {
      state.loading = true;
    },
    setClearNotification: (state, action) => {
      state.loading = false;
    },
    readNotification: (state) => {
      state.loading = true;
    },
    setReadNotification: (state, action) => {
      state.loading = false;
    },
    getNotification: (state) => {
      state.loading = true;
    },
    setGetNotification: (state, action) => {
      state.loading = false;
    },
    cancelChefBooking: (state) => {
      state.loading = true;
    },
    setCancelChefBooking: (state, action) => {
      state.loading = false;
    },
    hireChef: (state) => {
      state.loading = true;
    },
    setHireChef: (state, action) => {
      state.loading = false;
      state.bookingData = action.payload;
    },
    reportChat: (state) => {
      state.loading = true;
    },
    setReportChat: (state) => {
      state.loading = false;
    },
    getRating: (state) => {
      state.loading = true;
    },
    setGetRating: (state) => {
      state.loading = false;
    },
    giveRating: (state) => {
      state.loading = true;
    },
    setGiveRating: (state) => {
      state.loading = false;
    },
    updateCartItem: (state) => {
      state.loading = true;
    },
    setUpdateCartItem: (state, action) => {
      state.loading = false;
    },
    getSingleOrder: (state) => {
      state.loading = true;
    },
    setGetSingleOrder: (state, action) => {
      state.loading = false;
    },

    getAllOrder: (state) => {
      state.loading = true;
    },
    setGetAllOrder: (state, action) => {
      state.loading = false;
      state.allOrders = action.payload;
    },

    cancelOrder: (state) => {
      state.loading = true;
    },
    setCancelOrder: (state, action) => {
      state.loading = false;
    },
    createOrder: (state) => {
      state.loading = true;
    },
    setCreateOrder: (state, action) => {
      state.loading = false;
    },

    deleteCartItem: (state) => {
      state.loading = true;
    },
    setDeleteCartItem: (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
    },
    getAllCart: (state) => {
      state.loading = true;
    },
    setGetAllCart: (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
      state.cartCount = action.payload;
    },
    addToCart: (state) => {
      state.loading = true;
    },
    setAddToCart: (state) => {
      state.loading = false;
    },
    getHelperPages: (state) => {
      state.loading = true;
    },
    setGetHelperPages: (state, action) => {
      state.loading = false;
      state.helperPagesData = action.payload;
    },
    addContactUsDetail: (state) => {
      state.loading = true;
    },
    setAddContactUsDetail: (state, action) => {
      state.loading = false;
    },
    deleteAddress: (state) => {
      state.loading = true;
    },
    setDeleteAddress: (state, action) => {
      state.loading = false;
    },
    singleAddress: (state) => {
      state.loading = true;
    },
    setSingleAddress: (state, action) => {
      state.loading = false;
    },
    editUserAddress: (state) => {
      state.loading = true;
    },
    setEditUserAddress: (state, action) => {
      state.loading = false;
    },
    getUserAddress: (state) => {
      state.loading = true;
    },
    setGetUserAddress: (state, action) => {
      state.loading = false;
      state.userAddres = action.payload;
    },
    addAddress: (state) => {
      state.loading = true;
    },
    setAddAddress: (state, action) => {
      state.loading = false;
      state.address = action.payload;
    },
    onErrorStopLoad: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addAddress,
  setAddAddress,
  getUserAddress,
  setGetUserAddress,
  onErrorStopLoad,
  editUserAddress,
  setEditUserAddress,
  singleAddress,
  setSingleAddress,
  deleteAddress,
  setDeleteAddress,
  addContactUsDetail,
  setAddContactUsDetail,
  setGetHelperPages,
  getHelperPages,
  addToCart,
  setAddToCart,
  getAllCart,
  setGetAllCart,
  deleteCartItem,
  setDeleteCartItem,
  createOrder,
  setCreateOrder,
  cancelOrder,
  setCancelOrder,
  getAllOrder,
  setGetAllOrder,
  getSingleOrder,
  setGetSingleOrder,
  updateCartItem,
  setUpdateCartItem,
  giveRating,
  setGiveRating,
  getRating,
  setGetRating,
  reportChat,
  setReportChat,
  hireChef,
  setHireChef,
  cancelChefBooking,
  setCancelChefBooking,
  getNotification,
  setGetNotification,
  readNotification,
  setReadNotification,
  clearNotification,
  setClearNotification,
  menuRating,
  setMenuRating,
  getMenuRating,
  setGetMenuRating,
  getCurrentLocation,
  getLocationInfo,
  setGetLocationInfo,
} = userSilce.actions;

export default userSilce.reducer;
