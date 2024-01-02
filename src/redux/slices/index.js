import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { webSlice } from "./web";
import { userSilce } from "./user";
import { chefSilce } from "./chef";

export const mainReducer = combineReducers({
  auth: authSlice.reducer,
  web: webSlice.reducer,
  user: userSilce.reducer,
  chef: chefSilce.reducer
});
