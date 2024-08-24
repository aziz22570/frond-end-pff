// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: false,
  register: false,
  createFormation: false,
  contactInformation: false,
  securitySetting: false,
  chatroom: false,
  courroom: false,
  
};

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        handleLoginForm: (state) => {
          state.login = !state.login;
        },
        handleRegisterForm: (state) => {
          state.register = !state.register;
        },
        handleCreateFormationForm: (state) => {
          state.createFormation = !state.createFormation;
        },
        handleContactInformationForm: (state) => {
          state.contactInformation = !state.contactInformation;
        },
        handlesecuritySettingForm: (state) => {
          state.securitySetting = !state.securitySetting;
        },
        handleChatRoomForm: (state) => {
          state.chatroom = !state.chatroom;
        },
        handleCoursRoomForm: (state) => {
          state.courroom = !state.courroom;
        },
        closeForm: (state) => {
          state.login = false;
          state.register = false;
          state.createFormation = false;
          state.contactInformation = false;
          state.securitySetting = false;

        }
        // other reducers for logout, token refresh, etc.
    },
});

export const { handleLoginForm, handleRegisterForm,handleCreateFormationForm,handleContactInformationForm,handlesecuritySettingForm,closeForm,handleChatRoomForm,handleCoursRoomForm } = popupSlice.actions;
export default popupSlice.reducer;
