import React, { useEffect, useState } from 'react'
import Input from '../../input/Input'
import Button from '../../button/Button'
import styles from './style.module.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { handleRegisterForm } from '../../../../store/popupSlice'
import Swal from 'sweetalert2'
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState([]);

  const [role, setRole] = useState('Student');

  const dispatch = useDispatch()
  console.log(passwordError);

  function removeValue(arr, valueToRemove) {
    return arr.filter(value => value !== valueToRemove);
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
    if(usernameError === "-only letters and numbers"){
      const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (usernameRegex.test(e.target.value)) {
        setUsernameError("");
      } 
    }
    else if (usernameError) {
      if (e.target.value) {
        setUsernameError("");
      } 
  }
  }
const handleBlurUserName = (e) => {
  // validate username format
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if(!e.target.value){
      setUsernameError("-username is required");

    }
    else if (!usernameRegex.test(e.target.value)) {

      setUsernameError("-only letters and numbers");
    } else {
      setUsernameError("");
    }
  
}

  const handleEmail = (e) => {
    setEmail(e.target.value)
    if(emailError === "-Invalid email format"){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(e.target.value)) {
        setEmailError("");
      } 
    }
    else if (emailError) {
      if (e.target.value) {
        setEmailError("");
      } 
  }}
  const handleBlurEmail = (e) => {
    // validate email format

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!e.target.value){
      setEmailError("-email is required");

    }
    else if (!emailRegex.test(email)) {
      setEmailError("-Invalid email format");
    } else {
      setEmailError("");
    }
  }



  const handlePassword = (e) => {
    setPassword(e.target.value);
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialRegex = /[@$!%*?&]/;
    
    let errors = [...passwordError]; // Create a shallow copy of passwordError to modify
  
    // Handle regex check
    if(errors.length > 0) {
      if (!lowercaseRegex.test(e.target.value) || 
        !uppercaseRegex.test(e.target.value) || 
        !digitRegex.test(e.target.value) || 
        !specialRegex.test(e.target.value)) {
      if (!errors.includes("-one lowercase letter,uppercase letter,one digit and one special character is required.")) {
        errors.push("-one lowercase letter,uppercase letter,one digit and one special character is required.");
      }
    } else {
      errors = removeValue(errors, "-one lowercase letter,uppercase letter,one digit and one special character is required.");
    }
  
    // Handle length check
    if (e.target.value.length < 8) {
      if (!errors.includes("-Password must be at least 8 characters long.")) {
        errors.push("-Password must be at least 8 characters long.");
      }
    } else {
      errors = removeValue(errors, "-Password must be at least 8 characters long.");
    }
  
    // Update state
    setPasswordError(errors.length > 0 ? errors : "");
    }

  };
  
  const handleBlurPassword = ()=>{
    const errors = {
      security: "-one lowercase letter,uppercase letter,one digit and one special character is required.",
      length: "-Password must be at least 8 characters long."
    };
  
    // Define password validation regexes
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialRegex = /[@$!%*?&]/;
    // validate password format
    let errorMessages = [];

    if (!lowercaseRegex.test(password) || !uppercaseRegex.test(password) || !digitRegex.test(password) || !specialRegex.test(password)) {
      errorMessages.push(errors.security);
    }
    if (password.length < 8) {
      errorMessages.push(errors.length);
    }
    if (errorMessages.length > 0) {
      setPasswordError(errorMessages); // Combine all error messages
    } else {
      setPasswordError(""); // Clear error if all validations are satisfied
    }

  }
  const handleRole = (e) => {
    setRole(e.target.value)
  }


  const handleRegister = async (e) => {
    e.preventDefault()
    console.log( username, email, password,role)
    try {
       await axios.post('http://localhost:5000/api/v1/auth/register', { username, email, password,role });
      dispatch(handleRegisterForm())
      Swal.fire({
        icon: "success",
        title: "Successfully Registered",
      });
    } catch (error) {
    if (error.response) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    } 
    
    }
  };
  return (
    <form className={styles.form}>
    <Input type={"text"} id={"username"} text={"Username:"} value={username} onChange={handleUsername} onBlur={handleBlurUserName}/>
    {usernameError && <p style={{fontSize: "11px",alignSelf:"baseline"}} className='text-danger'> {usernameError} </p>}

    <Input type={"email"} id={"emailRegister"} text={"Email address:"} value={email} onChange={handleEmail} onBlur={handleBlurEmail}/>
    {emailError && <p style={{fontSize: "11px",alignSelf:"baseline"}} className='text-danger'> {emailError} </p>}

    <Input type={"password"} id={"passwordRegister"} text={"Password:"} value={password} onChange={handlePassword} onBlur={handleBlurPassword}/>
    {passwordError.length > 0 && 
    passwordError.map((error, index) => <p key={index} style={{fontSize: "11px",alignSelf:"baseline",textAlign: "left",width:"230px"}} className='text-danger'> {error} </p>)
    }

    <Input type={"radio"} id={"radioRegister"}   option2={"Student"} option1={"Teacher"} value={role} onChange={handleRole}/>

    <div className='my-3'>
        <Button onClick={handleRegister}  text="Register" type="bgb" w="w200" disabled={!role || passwordError || emailError || usernameError || !password || !email || !username}/>  
    </div>

  </form>
  )
}

export default LoginForm