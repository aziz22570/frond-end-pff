import React, { useRef, useState } from 'react'
import Search from '../../common/search/Search'
import { useParams } from 'react-router-dom'
import styles from './styles.module.css'
import { useSearchFormation } from '../../../API/formationApi'
import Pagination from '../../common/pagination/Pagination'
import Card from '../../common/card/Card'


const FormationSearch = () => {
  const resultRef = useRef(null)
  const [currentPage, setCurrentPage]=useState(1)
  const {search} = useParams()
 const {formations,totalpage,results} =  useSearchFormation(currentPage,search)
 console.log("formations",formations);

  console.log(search);
  return (
    <div>
      <Search search={search} reultRef={resultRef}/>
      <div className={styles.formatiosnSection}>
    <h3 ref={resultRef} className={styles.title}> Results: ({results})</h3>
  <ul className={styles.gridFormationList}>
    {formations.map((formation) =>(<Card id={formation._id} name={formation.name} price={formation.price} hours={formation.hours} creator={formation.creator} />))}    
  </ul>
    {formations.length > 20 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalpage={totalpage} />}
    </div>
    </div>
  )
}

export default FormationSearch