import React, { useEffect, useState } from "react";
import Input from "../../common/input/Input";

const StudentQuestion = ({
  choices,
  question,
  index,
  quizId,
  formationId,
  textaria,
  setAnswers,
  answers,
  disabled
}) => {
  console.log("render StudentQuestion");
  const [answer, setAnswer] = useState();
  useEffect(() => {
    answers?.map(answer =>{
      if(answer.questionId === question._id){
        setAnswer(answer.response);
      }
    })
  },[])

const handleAnswer = (e) => {
  setAnswer(e.target.value)
  answers?.map(an=>{
    if(an.questionId === question._id){
      return an.response = e.target.value;
    }
    return an;
  })

  const exists = answers?.some(answer => answer.questionId === question._id);
  !exists && setAnswers((prev)=>{
    return prev ? [...prev,{questionId:question._id,response:e.target.value}] : [{questionId:question._id,response:e.target.value}]})
}
  return (
    <div>
      {!choices && !textaria && (
        <Input disabled={disabled} type={"text"} value={answer} onChange={handleAnswer} text={question.question} />
      )}
      {choices && (
        <>
          <p>{question.question}</p>
          {choices.map((choice, index) => (
            <Input disabled={disabled} type={"radio"} id={index} option1={choice} value={answer} onChange={handleAnswer}/>
          ))}
        </>
      )}
      {textaria && (
          <div>
            <label for={index} class="form-label mt-4">
            {question.question}
            </label>
            <textarea
            disabled={disabled}
            value={answer}
             onChange={handleAnswer}
              class="form-control"
              id={index} 
              rows="3"
            ></textarea>
          </div>
      )}
    </div>
  );
};

export default StudentQuestion;
