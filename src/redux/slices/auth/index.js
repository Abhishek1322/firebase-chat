import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loading: false,
  chefDocumentUrl: {},
  userInfo: [],
  userEmail: {},
  showSideBar:false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    toggleSidebar: (state, action) => {
      state.loading = false;
      state.showSideBar = action.payload;
    },

    chefProfileDocument: (state) => {
      state.loading = true;
    },
    setChefProfileDocument: (state, action) => {
      state.loading = false;
      state.chefDocumentUrl = action.payload;
    },
    chefSetupProfile: (state) => {
      state.loading = true;
    },
    setChefSetupProfile: (state, action) => {
      state.loading = false;
    },

    deleteAccount: (state) => {
      state.loading = true;
    },
    setDeleteAccount: (state, action) => {
      state.loading = false;
    },
    resendResetPasswordOtp: (state) => {
      state.loading = true;
    },
    setResendResetPasswordOtp: (state, action) => {
      state.loading = false;
    },
    resendVerifyOtp: (state) => {
      state.loading = true;
    },
    setResendVerifyOtp: (state, action) => {
      state.loading = false;
    },

    userLogout: (state) => {
      state.loading = true;
    },
    setUserLogout: (state, action) => {
      state.loading = false;
    },

    createNewPassword: (state) => {
      state.loading = true;
    },
    setCreateNewPassword: (state, action) => {
      state.loading = false;
    },

    resetPassword: (state) => {
      state.loading = true;
    },
    setResetPassword: (state, action) => {
      state.loading = false;
    },
    resetPasswordOtp: (state) => {
      state.loading = true;
    },
    setResetPasswordOtp: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    forgotPassword: (state) => {
      state.loading = true;
    },
    setForgotPassword: (state, action) => {
      state.loading = false;
      state.userEmail = action.payload;
    },
    verifyOtp: (state) => {
      state.loading = true;
    },
    setVerifyOtp: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userSignUp: (state) => {
      state.loading = true;
    },
    setUserSignup: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    userLogin: (state) => {
      state.loading = true;
    },
    setUserLogin: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    onErrorStopLoad: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  userSignUp,
  setUserSignup,
  onErrorStopLoad,
  userLogin,
  setUserLogin,
  verifyOtp,
  setVerifyOtp,
  forgotPassword,
  setForgotPassword,
  resetPasswordOtp,
  setResetPasswordOtp,
  resetPassword,
  setResetPassword,
  createNewPassword,
  setCreateNewPassword,
  userLogout,
  setUserLogout,
  resendVerifyOtp,
  setResendVerifyOtp,
  resendResetPasswordOtp,
  setResendResetPasswordOtp,
  deleteAccount,
  setDeleteAccount,
  chefSetupProfile,
  setChefSetupProfile,
  chefProfileDocument,
  setChefProfileDocument,
  toggleSidebar,
} = authSlice.actions;

export default authSlice.reducer;
