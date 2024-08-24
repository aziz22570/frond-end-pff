// src/store/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const url = "http://localhost:5000";
const token = localStorage.getItem("token");

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
    video: true,
    sound: true,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },

    videoOff: (state) => {
      state.video = false;
    },
    videoOn: (state) => {
      state.video = true;
    },
    soundOff: (state) => {
      state.sound = false;
    },
    soundOn: (state) => {
      state.sound = true;
    },
  },
});

export const { setSocket ,videoOn,videoOff,soundOff,soundOn} = socketSlice.actions;

export const initializeSocket = () => (dispatch) => {
  var connectionOptions = {

    "force new connection": true,
    "reconnectionAttempts": "infinity",
    "timeout": 10000,
    "transports": ["websocket"]
    };
  const socket = io(url,connectionOptions);
  socket.on("connect", () => {
    token &&
    socket.emit("conected", token);
  });
  dispatch(setSocket(socket));
};

export default socketSlice.reducer;
