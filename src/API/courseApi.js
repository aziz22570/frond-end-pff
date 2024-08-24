import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../features/auth/axiosInstance";

export const sendCours = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/api/v1/courseroom`,
      formData
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
