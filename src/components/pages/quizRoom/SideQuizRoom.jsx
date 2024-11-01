import React from 'react'
import { useFetchUser } from '../../../API/User';
import styles from './styles.module.css'

const SideQuizRoom = ({students,setStudent,setCorectQuiz,id}) => {
  console.log('html',students);
const handleOpenStudentQuiz = (id) => {
  console.log("ok");

  setStudent(id)
  setCorectQuiz(true)
};
const handleOpenMainQuiz = () =>{
  setStudent("")
  setCorectQuiz(false)
}

  return (
    <div className={styles.sidequiz}>
      <div onClick={handleOpenMainQuiz} className={`${styles.quizBtn} ${id === "" && styles.active}`}>
        <p>Quiz</p>
      </div>
      {students.map((student) =>{
        return (
          <div className={`${styles.userBtn} ${id === student.userId._id && styles.active}`} key={student.userId._id} onClick={()=>handleOpenStudentQuiz(student.userId._id)}>
            <p>{student.userId.username}</p>
          </div>
        )
      })}
    </div>
  )
}

export default SideQuizRoom