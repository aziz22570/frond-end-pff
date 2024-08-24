import React from 'react'
import styles from './styles.module.css'
const Button = ({type,text,w,onClick,style}) => {
  return (
    <div>
      <button style={style} onClick={onClick} className={`${styles.button} ${styles[type]} ${styles[w]}`}>{text}</button>
    </div>
  )
}

export default Button