import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { teacherGetQuiz } from '../../../API/quiz';
import CorrectQuiz from './CorrectQuiz';
import CreateQuiz from './CreateQuiz';
import SideQuizRoom from './SideQuizRoom';

const QuizRoom = ({quizId,formationId,quizName}) => {

  const [quizData, setQuizData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [corectQuiz, setCorectQuiz] = useState(false);
  const [student,setStudent] = useState("");

console.log("corectQuiz",corectQuiz);
console.log("student",student);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const { data } = await teacherGetQuiz(formationId, quizId);
        setQuizData(data);
        console.log("the data",data);
      } catch (err) {
        setErr('Failed to fetch quiz data');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [formationId, quizId]);

  useEffect(() => {
    setQuizData(quizData)
  },[quizData])






if(loading){
  return <div>Loading...</div>
 
}

if(err){
  return <div>Error: {err}</div>
}

  return (
    <div className={styles.mainContainer}>
      <div className={styles.quizContainer}>
      {corectQuiz &&
      quizData?.usersAnswer?.map((userAnswer)=>{
        if(userAnswer.userId._id === student){
          return <CorrectQuiz  quizId={quizData._id} name={quizData.name} questions={quizData.questions} answers={userAnswer.answers} quizData={quizData} formationId={formationId}/>
        }
        return null;
      })}
      {!corectQuiz && <CreateQuiz quizData={quizData} formationId={formationId}/>}

      </div>







      <div className={styles.sideContainer}>
        <SideQuizRoom id={student} students={quizData.usersAnswer} setCorectQuiz={setCorectQuiz} setStudent={setStudent}/>
      </div>
    </div>
  )
}

export default QuizRoom