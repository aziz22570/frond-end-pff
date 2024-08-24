// src/store/peerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

export const peerSlice = createSlice({
  name: "peer",
  initialState: {
    peer: null,
    userId: "",
  },
  reducers: {
    setPeer: (state, action) => {
      state.peer = action.payload.peer;
      state.userId = action.payload.userId;
    },
    disconnectPeer: (state) => {
      if (state.peer) {
        state.peer.destroy();
      }
      state.peer = null;
      state.userId = "";
    },
  },
});

export const { setPeer, disconnectPeer } = peerSlice.actions;

export const initializePeer = () => (dispatch) => {
  const userId = uuidV4();
  const peer = new Peer(userId, {
    path: "/myapp",
    host: "localhost",
    port: "9000",
  });
  dispatch(setPeer({ peer, userId }));
};

export default peerSlice.reducer;
