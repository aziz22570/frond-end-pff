import React, { useEffect, useState } from "react";
import Input from "../../common/input/Input";
import styles from "./styles.module.css";
import Button from "../../common/button/Button";
import Choice from "./Choice";
import { apiCreteQuestion, apiUpdateQuestion} from "../../../API/quiz";

const Question = ({ question, index ,disabled,quizId,formationId,setQuestions}) => {
  const [newQuestion, setNewQuestion] = useState(question);
  const [enable,setEnable] = useState(!disabled);
  const [inputValue,setInputValue] = useState("");
  const [btnValue, setButtonValue] = useState(disabled ? "Update" : "Save")
const updateQuestion = ()=>{
  if(enable){
    apiUpdateQuestion({formationId, quizId,questionId:newQuestion._id,question:newQuestion.question,responseType:newQuestion.responseType,choices:newQuestion.choices})
    console.log("the data to update",{formationId, quizId,questionId:newQuestion._id,question:newQuestion.question,responseType:newQuestion.responseType,choices:newQuestion.choices});
    setButtonValue("Update")
    setEnable(!enable)
  }
  else{setButtonValue("Save");setEnable(!enable)}
}
const createQuestion = ()=>{
  apiCreteQuestion({formationId,quizId,question:newQuestion.question,responseType:newQuestion.responseType,choices:newQuestion.choices})
  setQuestions((prev)=>[...prev,newQuestion])
  setNewQuestion({
    question: "",
    responseType: "Short Answer",
    choices: [],
  })

}
const handleQuestion = (e)=>{
  setNewQuestion((prev)=>{return {...prev,question:e.target.value}})

}
const handleQuestionType = (e)=>{
setNewQuestion((prev)=>{return {...prev,responseType:e.target.value}})

}
const handleInput = (e)=>{
  setInputValue(e.target.value)
}
const handleChoice = (e)=>{
  setNewQuestion((prev)=>{return {...prev,choices:[...prev.choices,inputValue]}})
  setInputValue("")
  
  }
  useEffect(() => {
  console.log("newQuestion has updated",newQuestion);
  }, [newQuestion])
  
  

  return (
    <>
    {index === 'NQ' && <h5>Create New Question</h5>}
      <Input type={"text"} value={newQuestion.question} text={"Question:"} disabled={!enable} onChange={handleQuestion}/>
      <div className={styles.questionType}>
        <p>Question Type</p>
        <Input
          type={"radio"}
          value={newQuestion.responseType}
          id={index}
          option1={"QCM"}
          option2={"Short Answer"}
          option3={"Essay Questions"}
          disabled={!enable}
          onChange={handleQuestionType}
        />
      </div>
      { newQuestion.responseType === "QCM" && (
        <>
          <h6>Choices:</h6>
          {newQuestion.choices.map((option, i) => {
            return (
              <Choice  option={option} i={i} enable={enable} choices={newQuestion.choices} setNewQuestion={setNewQuestion} />
            );
          })}
            {(index  === 'NQ' || enable) && 
    <div className="d-flex align-items-baseline">
      <Input type={"text"} value={inputValue} text={`Add New Choice`} onChange={handleInput} />
      <Button text={index === 'NQ' ?"Create":btnValue} onClick={handleChoice} type="bgw" w="w50" />
    </div>
    

        }
        </>
      )}
          <Button text={index === 'NQ' ?"Create":btnValue} onClick={index === 'NQ' ?createQuestion : updateQuestion} type="bgw" w="w100" parentStyle={{width: "100%",display: "flex",justifyContent: "flex-end"}} />

    </>
  );
};

export default Question;
