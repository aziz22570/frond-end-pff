import ReactDom from 'react-dom'
import styles from './modal.module.css'


const Modal = ({onClick,children}) => {
  return(
      ReactDom.createPortal(
      <>
        <div onClick={onClick} className={styles.backDrop}></div>
        <div className={styles.overlay}>
          {children}
        </div>
      </>,document.getElementById('modal'))
        )

}

export default Modal