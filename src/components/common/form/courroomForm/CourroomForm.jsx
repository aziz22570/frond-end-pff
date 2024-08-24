import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { handleCoursRoomForm } from '../../../../store/popupSlice';
import Input from '../../input/Input';
import Button from '../../button/Button';

const CourroomForm = ({id}) => {
  const socket = useSelector((state) => state.socket.socket);
const dispatch = useDispatch()

const [inputValue,setInputValue] = useState("")
const handleInput = (e)=>{
  setInputValue(e.target.value)
}

const handleCreate = ()=>{
  console.log(inputValue)
  socket.emit("create-cour-room",{formation: id,name: inputValue})

    dispatch(handleCoursRoomForm());

}

  return (
    <div>
    <h3>Create New Cour room</h3>
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

<Button text={"Create"} type="bgb" w="w100"  onClick={handleCreate}/>
</div>
</div>
</div>
  )
}

export default CourroomForm