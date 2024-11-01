import React from 'react'
import styles from './styles.module.css'
const Button = ({type,text,w,onClick,style,parentStyle,disabled}) => {
  return (
    <div style={parentStyle}>
      <button disabled={true && disabled} style={style} onClick={onClick} className={`${disabled && styles.disabledBtn} ${styles.button} ${styles[type]} ${styles[w]}`}>{text}</button>
    </div>
  )
}

export default Button