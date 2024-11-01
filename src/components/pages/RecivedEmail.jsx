import React from 'react'
import { useFetchEmail } from '../../API/email'

const RecivedEmail = () => {
  const { data, loading, error } = useFetchEmail()
  console.log("the emails",data);
  return (
    <div style={{
      width: "10vw",
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"red",
      marginLeft: "auto",
      overflowY: "scroll"
    }}>

  </div>
  )
}

export default RecivedEmail