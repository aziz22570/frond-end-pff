import React, { useState } from 'react'
import Input from '../../input/Input'
import Button from '../../button/Button'
import styles from './style.module.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { handleRegisterForm } from '../../../../store/popupSlice'
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch()

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
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
      // Handle successful registration (e.g., show success message)
    } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
      // Update UI to inform the user about the error (e.g., show error message)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      console.log('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error message:', error.message);
    }
    }
  };
  return (
    <form className={styles.form}>
    <Input type={"text"} id={"username"} text={"Username:"} value={username} onChange={handleUsername}/>
    <Input type={"email"} id={"emailRegister"} text={"Email address:"} value={email} onChange={handleEmail}/>
    <Input type={"password"} id={"passwordRegister"} text={"Password:"} value={password} onChange={handlePassword}/>
    <Input type={"radio"} id={"radioRegister"}  option2={"Student"} option1={"Teacher"} value={role} onChange={handleRole}/>
    <div className='my-3'>
        <Button onClick={handleRegister} text="Register" type="bgb" w="w200"/>  
    </div>

  </form>
  )
}

export default LoginForm