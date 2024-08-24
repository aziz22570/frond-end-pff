// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  admin: false,
  Student: false,
  Teacher: false,
  loading: false,
  meeting: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.error("success")
      console.log("payload :", action.payload);
      const user = action.payload;
      state.user = user;
      state.isLoggedIn = true;
      state[user.role] = true; // Set the role flag to true
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state) => {
      console.error("fail")
      state.user = null;
      state.isLoggedIn = false;
      state.admin = false;
      state.Student = false;
      state.Teacher = false;
      state.loading = false;
    },
    joinFormation: (state, action) => {
      state.user.formation = [...state.user.formation,action.payload];
    },
    startMeet: (state) => {
      state.meeting = true;
    },
    endMeet: (state) => {
      state.meeting = false;
    }
    // other reducers for logout, token refresh, etc.
  },

});

export const { loginSuccess, loginFailure,joinFormation,startMeet ,endMeet} = authSlice.actions;
export default authSlice.reducer;
