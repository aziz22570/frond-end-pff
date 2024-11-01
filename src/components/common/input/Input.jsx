import React from "react";
import styles from "./styles.module.css";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import { FaPen } from "react-icons/fa";
const Input = ({
  text,
  type,
  id,
  value,
  onChange,
  onClick,
  disabled,
  flech,
  translate,
  placeholder,
  updateBtn,
  delBtn,
  onBlur,
  ...options
}) => {
  let choix = Object.values(options);
  console.log(choix);
  return type === "radio" ? (
    <div className="d-flex">
      {choix.map((choix, index) => (
        <div className="form-check mx-2" key={index}>
          <input
            className="form-check-input"
            checked={value === choix}
            onChange={onChange}
            type={type}
            name={id}
            id={index}
            value={choix}
            placeholder={placeholder}
            disabled={disabled && true}
          />
          <label htmlFor={id}>{choix}</label>
        </div>
      ))}
    </div>
  ) : (
    <div className="form-group position-relative" >
      <label htmlFor={id} className="form-label mt-2">
        {text}
        <div className="d-flex align-items-center position-relative">
          <input
            style={translate}
            type={type}
            className="form-control"
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled && true}
            onBlur={onBlur}
          />
          <div className="position-absolute end-0 m-3 d-flex align-items-center">

            {flech === "down" &&  <FaArrowDownLong />}
            {flech === "up" && <FaArrowUpLong />}
          </div>

          {disabled && (
            <div 
            onClick={onClick}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            ></div>
          )}
        </div>
      </label>
    </div>
  );
};

export default Input;
