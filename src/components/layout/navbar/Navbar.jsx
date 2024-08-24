import React, { useEffect, useState, memo, useCallback, useMemo } from "react";
import { Link, NavLink,useLocation  } from "react-router-dom";
import styles from "./style.module.css";
import Button from "../../common/button/Button";
import Modal from "../../common/modal/Modal";
import RegisterForm from "../../common/form/registerForm/RegisterForm";
import LoginForm from "../../common/form/loginForm/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure } from "../../../store/authSlice";
import { handleLoginForm, handleRegisterForm } from "../../../store/popupSlice";
import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const loginForm = useSelector((state) => state.form.login);
  const registerForm = useSelector((state) => state.form.register);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(()=>{
    if(isLoggedIn === false){
      dispatch(loginFailure())
    }
  },[isLoggedIn,dispatch])

  const handleRegister = useCallback(() => {
    dispatch(handleRegisterForm());
  }, [dispatch]);

  const handleLogin = useCallback(() => {
    dispatch(handleLoginForm());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(loginFailure());
  }, [dispatch]);

  const data = useMemo(() => [
    {label: <Link to="/profile"><Button text="My Profil" type="bgw" w="w100" /></Link>,value: 2},
    {label: <Button text="Log Out" type="bgb" w="w100" onClick={handleLogout} />, value: 1},
  ], [handleLogout]);

  const links = useMemo(() => [
    {
      id: 1,
      path: "/",
      text: "Home",
    },
    {
      id: 2,
      path: "/formations",
      text: "Formation",
    },
    {
      id: 3,
      path: "/contact",
      text: "Contact",
    },
  ], []);

  useEffect(() => {
    setSelectedItem(null)}
  ,[selectedItem])
  if(currentPath==="/admin" || currentPath ==="/loginAdmin") {
    return (<div></div>);}
    else if (user?.role==="admin"){localStorage.removeItem("token")}
  return (
    <>
      {registerForm && (
        <Modal onClick={handleRegister}>
          <RegisterForm />
        </Modal>
      )}
      {loginForm && (
        <Modal onClick={handleLogin}>
          <LoginForm />
        </Modal>
      )}

      <nav className="d-flex justify-content-between align-items-center my-4 container-fluid">
        <Link className={`${styles.logo}`} to="/">
          <img className={styles.w100} src="/teach.png" alt="" />
        </Link>
        <ul className={`${styles.navbarBrand} w-50  justify-content-around`}>
          {links.map((link) => (
            <li key={link.id}>
              <NavLink
                className={({ isActive }) =>
                  [
                    isActive
                      ? `${styles.active}  ${styles.link}`
                      : ` ${styles.link}`,
                  ].join(" ")
                }
                to={link.path}
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
        {!isLoggedIn ? (
          <div className="d-flex">
            <Button text="login" type="bgw" w="w100" onClick={handleLogin} />
            <Button
              text="sign up"
              type="bgb"
              w="w100"
              onClick={handleRegister}
            />
          </div>
        ) : (
          <div className="d-flex">
            <SimpleDropdown
              disabled
              clearable
              defaultValue={selectedItem}
              onChange={setSelectedItem}
              options={data}
              labels={{ notSelected: user.username,selected: user.username}}        
              configs={ { position: { y: 'bottom', x: 'center' } } }
            />
          </div>
        )}
      </nav>
    </>
  );
};

export default memo(Navbar);
