import React from 'react'
import Input from '../../common/input/Input'

const Choice = ({option,i,enable,choices,setNewQuestion}) => {

  const handleChoice = (i,e)=>{
    console.log("the i",i);
    const updatedChoice = choices.map((choise,index) => i === index ? e.target.value : choise)
    setNewQuestion((prev)=>{return {...prev,choices: updatedChoice}})
    
    }
  return (
    <Input type={"text"} value={option} text={`choice ${i + 1}`} disabled={!enable} onChange={(e)=>handleChoice(i,e)} />

  )
}

export default Choice