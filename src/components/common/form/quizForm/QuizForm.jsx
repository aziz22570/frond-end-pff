import React, { useState } from "react";
import Input from "../../input/Input";
import Button from "../../button/Button";
import { useDispatch } from "react-redux";
import { handleQuizRoomForm } from "../../../../store/popupSlice";
import { createQuiz } from "../../../../API/quiz";

const QuizForm = ({ id }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleCreate = () => {
    console.log(inputValue);
    createQuiz({name:inputValue,formationId:id})

    dispatch(handleQuizRoomForm());
  };

  return (
    <div>
      <h3>Create New Quiz</h3>
      <div className="d-flex align-items-baseline flex-column">
        <Input
          type={"text"}
          id={"name"}
          text={"Name:"}
          value={inputValue}
          onChange={handleInput}
        />
        <div className="d-flex pt-4 w-100 justify-content-end">
          {/* <Button text="Annuler" type="bgw" w="w100" onClick={addCategory} /> */}

          <Button text={"Create"} type="bgb" w="w100" onClick={handleCreate} />
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
