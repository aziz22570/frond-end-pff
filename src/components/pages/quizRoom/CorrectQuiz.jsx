import React, { useState } from 'react'
import styles from "./styles.module.css"
import StudentQuestion from './StudentQuestion'
import Button from '../../common/button/Button'
import { apiAnswerQuestion } from '../../../API/quiz'

const CorrectQuiz = ({ questions,answers,quizData,formationId,name ,quizId}) => {
  const [answersNote, setAnswersNote] = useState(answers || [])
  const submitAnswers = ()=>{
    console.log("submitting answers",answers);
    apiAnswerQuestion({formationId,quizId,answers})
  }

  return (
    <div>
    <h1>{name}</h1>
    {questions?.map((question, index) => (
      <div className={styles.containerCreateQuestion} key={question._id}>
        <h5>Q:{index + 1}</h5>
        {question.responseType === "QCM" && (
          <StudentQuestion
          disabled={true && answers }
          answers={answersNote}
          setAnswers={setAnswersNote}
            formationId={formationId}
            quizId={quizData._id}
            question={question}
            index={index}
            choices={question.choices}
          />
        )}
        {(question.responseType === "Short Answer" ) && (
          <StudentQuestion disabled={true && answers } answers={answersNote} setAnswers={setAnswersNote} question={question} index={index}  quizId={quizData._id} formationId={formationId}/>
        )}
        {(question.responseType === "Essay Questions") && (
          <StudentQuestion disabled={true && answers } answers={answersNote} setAnswers={setAnswersNote} question={question} index={index}  quizId={quizData._id} formationId={formationId} textaria/>
        )}
      </div>
    ))}
        <Button disabled={answers ? true : false} text={answersNote ? 'Submited' :"Submit"} onClick={submitAnswers} type="bgw" w="w200" parentStyle={{width: "100%",display: "flex",justifyContent: "center"}} />

  </div>
  )
}

export default CorrectQuiz