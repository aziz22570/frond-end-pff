import React, { useEffect, useState } from 'react'
import useFetchFormer, { getAllFormer } from '../../API/Teacher'
import styles from './styles.module.css'
import Pagination from '../../components/common/pagination/Pagination'
import { ThreeCircles } from 'react-loader-spinner'

const FormerList = () => {
const [page , setPage ] = useState(1)

const {Teacher, countFormer,loadingFormer, errorFormer} = useFetchFormer(page,10)

  if (loadingFormer) {
    return (<div className="d-flex justify-content-center align-items-center" style={{
      width: "100%",
      height: "100%"
    }}>
      <ThreeCircles
    visible={true}
    height="100"
    width="100"
    color="#rgb(0, 171, 228)"
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />;
      </div>)
  }
  return (
    <div className={styles.listContainer}>
      <h1>Formers List</h1>
      <div className={styles.cardContainer}>
      {Teacher?.map((Teacher)=>
      <div className={styles.card}>
        <div className={styles.imageContainer}  >
        <img style={{width:"100%",height:"100%",borderRadius:"20px"}}
              src={
                Teacher.image
                  ? `http://localhost:5000/usersImages/${Teacher.image}`
                  : `http://localhost:5000/usersImages/default.jpg`
              }
              alt={`${Teacher.name}`}
            />
        </div>
        <div className={styles.infoContainer}>
          <p>Name: {Teacher.username}</p>
          <p>Email: {Teacher.email}</p>
          <p>Number: {Teacher.number}</p>
        </div>
        <div className={styles.statistiqueContainer}>
          <p>Rating: 5/5</p>
          <p>Courses: {Teacher.formation.length}</p>
        </div>
      </div>
      
      )}
    {Math.ceil(countFormer/10) > 1 &&   <Pagination currentPage={page} setCurrentPage={setPage} totalpage={Math.ceil(countFormer/10)} />}

      </div>
    </div>
  )
}

export default FormerList