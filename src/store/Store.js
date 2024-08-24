// store.js
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./authSlice";
import formReducer from "./popupSlice";
import socketReducer from "./socketSlice";
import peerReducer from "./peerSlice";

// Create the persist config for your reducers


const rootReducer = {
  user:  userReducer,
  form: formReducer,
  socket: socketReducer,
  peer: peerReducer,
  // other reducers...
};

const store = configureStore({
  reducer: rootReducer,

});


export { store };
