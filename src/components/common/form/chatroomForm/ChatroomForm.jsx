import React, { useState } from 'react'
import Input from '../../input/Input'
import Button from '../../button/Button'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { handleChatRoomForm } from '../../../../store/popupSlice';

const ChatroomForm = ({id}) => {
const socket = useSelector((state) => state.socket.socket);
const dispatch = useDispatch()

  const [inputValue,setInputValue] = useState("")
  const handleInput = (e)=>{
    setInputValue(e.target.value)
  }
  const handleCreate = ()=>{
    console.log(inputValue)
    socket.emit("create-chat-room",{formation: id,name: inputValue})

      dispatch(handleChatRoomForm());

  }
  

  return (
    <div>
      <h3>Create New Chatroom</h3>
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

export default ChatroomForm