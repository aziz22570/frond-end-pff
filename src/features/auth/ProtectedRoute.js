// features/auth/ProtectedRoute.js
import {  Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const ProtectedRoute = ( {allowedRoles,children }) => {
const location = useLocation()

  
  const userRole = useSelector((state) => state.user.user?.role);
  const token = localStorage.getItem("token");
  const authorization = allowedRoles.includes(userRole);
  const allowed =  userRole && token && authorization;
  console.log(userRole,token,authorization,allowed)
  if (userRole === undefined && token) {
    return <h1>loiding</h1>
  }
  return allowed ? children :(allowedRoles[0] === "admin" ? <Navigate to="/loginAdmin" />:<Navigate to="/" />)
};

export default React.memo(ProtectedRoute) ;
