import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess } from '../store/authSlice';
import styles from './styles.module.css'
import Input from '../components/common/input/Input';
import Button from '../components/common/button/Button.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AdminForm = () => {
  const user = useSelector((state) => state.user.user);
const navigate = useNavigate()
  console.log("login form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email, password, role:"admin" }
      );

      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      dispatch(loginSuccess(response.data.user))
      console.log(response.data);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      dispatch(loginFailure())
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // Update UI to inform the user about the error (e.g., show error message)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        console.log("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
      }
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
useEffect(() => {
  user?.role === "admin" ? navigate(`/admin`) : localStorage.removeItem("token")



}, [user,navigate])

  return (
    <div className={styles.loginFormContainer}>
    <div className={styles.imageContainer}>
      <img src="pngaaa.com-5315396.png" alt="admin" />
    </div>
    <form className={styles.form}>
      <Input
        type={"email"}
        id={"emailRegister"}
        text={"Email address:"}
        value={email}
        onChange={handleEmail}
      />
      <Input
        type={"password"}
        id={"passwordRegister"}
        text={"Password:"}
        value={password}
        onChange={handlePassword}
      />

      <div className="my-3">
        <Button text="Login" type="bgb" w="w200" onClick={handleLogin} />
      </div>
    </form>
    </div>
  );
}

export default AdminForm