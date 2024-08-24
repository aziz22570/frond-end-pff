// authService.js

import axios from "./axiosInstance";


// Function to check if a token exists in local storage


// Function to get user data from the server
export const getUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if(token) {
    const response = await axios.get("http://localhost:5000/api/v1/auth/check-user-login");
    return response.data.user;

  }}catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
