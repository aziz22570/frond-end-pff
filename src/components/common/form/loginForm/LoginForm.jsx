import React, { useState } from "react";
import { loginSuccess, loginFailure } from "../../../../store/authSlice.js";
import Input from "../../input/Input";
import Button from "../../button/Button";
import styles from "./style.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleLoginForm } from "../../../../store/popupSlice.js";
import { persistor } from "../../../../store/Store.js";

const LoginForm = () => {
  console.log("login form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
        { email, password, role }
      );

      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      dispatch(loginSuccess(response.data.user));
      dispatch(handleLoginForm());
      console.log(response.data);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      dispatch(loginFailure());
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
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  return (
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
      <Input
        type={"radio"}
        id={"radioRegister"}
        option2={"Student"}
        option1={"Teacher"}
        value={role}
        onChange={handleRole}
      />
      <div className="my-3">
        <Button text="Login" type="bgb" w="w200" onClick={handleLogin} />
      </div>
    </form>
  );
};

export default LoginForm;
