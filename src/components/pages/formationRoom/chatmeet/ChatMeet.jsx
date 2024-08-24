import React, { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import { useSelector } from 'react-redux';
import { MessageBox } from 'react-chat-elements';
import { useParams } from 'react-router-dom';
const ChatMeet = ({messages,setMessages}) => {
  const [inputValue,setInputValue] = useState("")
  const { codeRoom } = useParams();

  const user = useSelector((state) => state.user.user);

  const socket = useSelector((state) => state.socket.socket);
  useEffect(() => {
    socket.on('recive-meet-message', ({message}) => {
      console.log("messages ",message)
      setMessages((prev)=>{return [...prev, message]})
    });
    return () => {
      socket.removeAllListeners("recive-meet-message");
    };

  },[socket])

    const sendMessage = ()=>{
      socket.emit('send-meet-message', {meetId: codeRoom, message:{message: inputValue, name: user.username,sender: user._id}});
      setInputValue("")
    }
    const inputHandler = (e) => {
      setInputValue(e.target.value)
    }


  return (
    <div className={styles.sidebar}>
    <div className={styles.chatBox}>
      {messages?.map((msg, index) => (
        <MessageBox
          key={index}
          position={msg.sender === user._id? 'right' : 'left'}
          type={"text"}
          text={msg.message}
          title={msg.name}
        />
      ))}
    {/* <MessageBox
            key={index}
            position={mymsg ? 'right' : 'left'}
            type={"text"}
            text={msg.text}
            title={!mymsg && (msg.sender.username || msg.name) }
            date={date}
            className={mymsg && styles.msgbox}
          /> */}

    </div>
    <div className={styles.formContainer}>
    <input
      type="text"
      value={inputValue}
      placeholder="Type a message..."
      onChange={inputHandler}
    />
    <button onClick={sendMessage}>Send</button>

    </div>
  </div>
  )
}

export default ChatMeet