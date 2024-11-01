import React, { useState } from 'react'
import {useFetchStudent} from '../../API/student'
import styles from './styles.module.css'
import Pagination from '../../components/common/pagination/Pagination'
import { ThreeCircles } from 'react-loader-spinner'


const StudentList = () => {
  const [page , setPage ] = useState(1)

  const {student, studentCount,loadingStudent, errorStudent} = useFetchStudent(page,10)

    if (loadingStudent) {
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

        <h1>Students List</h1>

        <div className={styles.cardContainer}>
        {student?.map((student)=>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
          <img style={{width:"100%",height:"100%",borderRadius:"20px"}}
                src={
                  student.image
                    ? `http://localhost:5000/usersImages/${student.image}`
                    : `http://localhost:5000/usersImages/default.jpg`
                }
                alt={`${student.name}`}
              />
          </div>
          <div className={styles.infoContainer}>
          <p>Name: {student.username}</p>
          <p>Email: {student.email}</p>
          <p>Number: {student.number}</p>
          </div>
          <div className={styles.statistiqueContainer}>
          <p>Rating: 5/5</p>
            <p>Courses: {student.formation.length}</p>
          </div>
        </div>
        
        )}
        </div>
    {Math.ceil(studentCount/10) > 1 &&   <Pagination currentPage={page} setCurrentPage={setPage} totalpage={Math.ceil(studentCount/10)} />}

      </div>
    )
}

export default StudentList