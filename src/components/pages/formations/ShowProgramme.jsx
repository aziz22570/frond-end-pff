import React, { useState } from 'react'
import styles from './styles.module.css'
import { CiCircleChevDown , CiCircleChevUp} from "react-icons/ci";
const ShowProgramme = ({id,tile,soustitles}) => {
  const [show,setShow]= useState(false)
  const handleToggle = ()=>{
    setShow(!show)
  }
  return (
    <div className={styles.programmeContainer} key={id}> 
    <div className={styles.programmeTitle} onClick={handleToggle}>{tile} {!show ?<CiCircleChevDown/>: <CiCircleChevUp/>}</div>
    <div className={styles.flexCol}  >{show && soustitles.map((soustitle)=><div className={styles.programmesousTitle} >{soustitle}</div>)}
</div>
    
    </div>
  )
}

export default ShowProgramme