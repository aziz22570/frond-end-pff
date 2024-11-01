import React, { useEffect, useState } from "react";
import Input from "../../common/input/Input";
import styles from "./styles.module.css";
import Question from "./Question";
import Button from "../../common/button/Button";

const CreateQuiz = ({ quizData ,formationId}) => {

  const [questions, setQuestions] = useState(quizData?.questions);

  useEffect(() => {
    setQuestions(quizData.questions);
  }, [quizData]);

  return (
    <div>
      <h1>{quizData?.name}</h1>
      {questions?.map((question, index) => (
        <div className={styles.containerCreateQuestion} key={question._id}>
          <h5>Q:{index + 1}</h5>
          {question.responseType === "QCM" && (

            <Question
            formationId={formationId}
            quizId={quizData._id}
            disabled
              question={question}
              index={index}
              choices={question.choices}
            />
          )}
          {(question.responseType === "Short Answer" || question.responseType === "Essay Questions") && (
            <Question question={question} index={index} disabled quizId={quizData._id} formationId={formationId}/>
          )}
        </div>
      ))}
      <div className={styles.containerCreateQuestion}>
        <Question
        setQuestions={setQuestions}
        formationId={formationId}
        quizId={quizData._id}
          question={{
            question: "",
            responseType: "Short Answer",
            choices: [],
          }}
          index={"NQ"}
        />
      </div>
    </div>
  );
};

export default CreateQuiz;
