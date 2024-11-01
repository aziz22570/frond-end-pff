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
  console.log("the eeeeeeeeee token");
  var connectionOptions = {

    "force new connection": true,
    "reconnectionAttempts": "infinity",
    "timeout": 10000,
    "transports": ["websocket"]
    };
  const socket = io(url,connectionOptions);
  socket.on("connect", () => {
    localStorage.getItem("token") &&  socket.emit("conected", localStorage.getItem("token"));
    console.log("the token is",localStorage.getItem("token"));

  });
  dispatch(setSocket(socket));
};

export default socketSlice.reducer;
