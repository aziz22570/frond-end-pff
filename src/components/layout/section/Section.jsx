import React from 'react'
import styles from './styles.module.css'
import Card from '../../common/card/Card'
import Pagination from '../../common/pagination/Pagination'

const Section = ({formations,currentPage,setCurrentPage,totalpage,title}) => {
  return (
    <div className={styles.formatiosnSection}>
    <h3 className={styles.title}>{title}</h3>
  <ul className={` ${styles.formationList}`}>
    <div className='row' style={{width: "90%"}}>
    {formations?.map((formation) =>(<div className='col-md-3' key={formation._id}><Card id={formation._id} name={formation.name} price={formation.price} hours={formation.hours} creator={formation.creator} image={formation.image}/></div> ))}    
    </div>
  </ul>
  {totalpage && totalpage > 1 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalpage={totalpage} />}
    
    </div>
  )
}

export default React.memo(Section)