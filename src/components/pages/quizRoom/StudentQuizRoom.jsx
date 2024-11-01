import React, { useEffect, useState } from "react";
import StudentQuestion from "./StudentQuestion";
import { apiAnswerQuestion, getquiz } from "../../../API/quiz";
import styles from "./styles.module.css";
import Button from "../../common/button/Button";

const StudentQuizRoom = ({ quizId,formationId, quizName }) => {
  console.log("render StudentQuizRoom");

  const [quizData, setQuizData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([])
  const [prevAnswers, setPrevAnswers] = useState([])
console.log("the prv quizData ",quizData);
console.log("the prv answers ",answers);
  const submitAnswers = ()=>{
    console.log("submitting answers",answers);
    apiAnswerQuestion({formationId,quizId,answers})
    setPrevAnswers(answers)
  }


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const { data } = await getquiz(formationId, quizId);
        setQuizData(data);
        setQuestions(data.questions)
        console.log("eeeeee",data.usersAnswer);
        setAnswers(data.usersAnswer?.answers)
        setPrevAnswers(data.usersAnswer?.answers)
        console.log("the data", data);
      } catch (err) {
        setErr("Failed to fetch quiz data");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [formationId, quizId]);

  useEffect(() => {
    setQuizData(quizData);
  }, [quizData]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (err) {
    return <div>Error: {err}</div>;
  }

  return (
    <div>
      <h1>{quizData?.name}</h1>
      {questions?.map((question, index) => (
        <div className={styles.containerCreateQuestion} key={question._id}>
          <h5>Q:{index + 1}</h5>
          {question.responseType === "QCM" && (
            <StudentQuestion
            disabled={true && prevAnswers }
            answers={answers}
            setAnswers={setAnswers}
              formationId={formationId}
              quizId={quizData._id}
              question={question}
              index={index}
              choices={question.choices}
            />
          )}
          {(question.responseType === "Short Answer" ) && (
            <StudentQuestion disabled={true && prevAnswers } answers={answers} setAnswers={setAnswers} question={question} index={index}  quizId={quizData._id} formationId={formationId}/>
          )}
          {(question.responseType === "Essay Questions") && (
            <StudentQuestion disabled={true && prevAnswers } answers={answers} setAnswers={setAnswers} question={question} index={index}  quizId={quizData._id} formationId={formationId} textaria/>
          )}
        </div>
      ))}
          <Button disabled={prevAnswers ? true : false} text={answers ? 'Submited' :"Submit"} onClick={submitAnswers} type="bgw" w="w200" parentStyle={{width: "100%",display: "flex",justifyContent: "center"}} />

    </div>
  );
};

export default StudentQuizRoom;
