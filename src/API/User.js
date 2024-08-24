import { useDispatch } from "react-redux";
import axiosInstance from "../features/auth/axiosInstance";
import { loginFailure, loginSuccess } from "../store/authSlice";
import { useEffect, useState } from "react";


export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const useCheckUserLogin = () => {
  console.log("useer check user login");
  const dispatch = useDispatch();
  
    
const checkUserLogin = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5000/api/v1/auth/check-user-login"
      );

      dispatch(loginSuccess(response.data.user));
    } catch (error) {
      dispatch(loginFailure());
      localStorage.removeItem("token");
      alert("token removed")
      console.error(error);
    }
  }

}

  checkUserLogin()

}


export const useUpdateUser = () => {
  const dispatch = useDispatch();


  const updateData = async(data,type)=>{
    try {
    console.log(data,"update");
    console.log(type,"update 2");

      const response = await axiosInstance.patch(`${process.env.REACT_APP_API_URL}/api/v1/user/`,
        data,
        type &&       
        {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      dispatch(loginSuccess(response.data.data))
      console.log(response.data);


    }
    catch (error) {
      console.error("Error updating User:", error.response);
    }
  }
  return { updateData };

}

export const useFetchUser = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/${id}`
        );
        setUser(response.data.data);
        console.log("the user data is",response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    
  }, [id]);

  return {
    user,
    loading,
    error,
  };
};
