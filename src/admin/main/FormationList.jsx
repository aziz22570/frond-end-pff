import React, { useState } from 'react'
import styles from './styles.module.css'
import {useFetchFormation} from '../../API/certif'
import Pagination from '../../components/common/pagination/Pagination'
const FormationList = () => {
  const [page , setPage ] = useState(1)

  const {data, count,loading, error} = useFetchFormation(page,10)

    if (loading) {
      return ( <div>loading</div>)
    }
    return (
      <div className={styles.listContainer}>
        <h1>Courses List</h1>

        <div className={styles.cardContainer}>
        {data?.map((formation)=>
        <div className={styles.card}>
          <div className={styles.imageContainer}  >
          <img style={{width:"100%",height:"100%",borderRadius:"20px"}}
                src={
                  formation.image
                    ? `http://localhost:5000/formationImg/${formation.image}`
                    : `http://localhost:5000/formationImg/default.jpg`
                }
                alt={`${formation.name}`}
              />
          </div>
          <div className={styles.infoContainer}>
          <p>Name: {formation.name}</p>

            <p>Creator:  {formation.creator.username}</p>
            <p>Price: {formation.price}</p>
          </div>
          <div className={styles.statistiqueContainer}>
            <p>Rating: 5/5</p>
            <p>Participants:{formation.participants.length}</p>
          </div>
        </div>
        
        )}
        </div>
    {Math.ceil(count/10) > 1 &&   <Pagination currentPage={page} setCurrentPage={setPage} totalpage={Math.ceil(count/10)} />}

      </div>
    )
}

export default FormationList