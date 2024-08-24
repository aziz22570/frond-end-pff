import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
// RCE CSS
import "react-chat-elements/dist/main.css";
// MessageBox component
import { MessageBox } from "react-chat-elements";
import { MessageList } from "react-chat-elements";
import { ChatItem } from "react-chat-elements";
import { Avatar } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeSocket } from "../../../store/socketSlice";

const ChatRoom = ({ chatRoom }) => {
  console.log(chatRoom);

  const messageListReferance = React.createRef();
  const inputReferance = React.createRef();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user.user);
  const socket = useSelector((state) => state.socket.socket);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.emit("join-chat-room", chatRoom._id);

      socket.on("initialMessages", (initialMessages) => {
        setMessages(initialMessages);
      });

      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      socket.on("room-chat-created", (data) => {
      });
    }
    return () => {
      setMessages([])

    }
  }, [id, socket,chatRoom._id]);
  const token = localStorage.getItem("token");
  const createChatRoom = () => {
    socket.emit("create-chat-room", { formation: id, name: "formation name" });
  };

  const sendMessage = () => {
    if(text){
    if (text.trim()) {
      const message = {
        sender: token,
        text:text,
        name:user.username,
      }; // Adjust sender

      socket.emit("sendMessage", { chatRoomId:chatRoom._id, message });
      setText("");
    }}

  };
  return (
    <div className={styles.container}>
      <h1 className="mb-4">{chatRoom?.name}</h1>
      <div className={`message-list ${styles.messageContainr}`}>
        {messages.map((msg, index) => {
          const date = new Date(msg.date)
          const mymsg = (msg.sender._id === user._id || msg.sender === user._id)
          return(
          <MessageBox
            key={index}
            position={mymsg ? 'right' : 'left'}
            type={"text"}
            text={msg.text}
            title={!mymsg && (msg.sender.username || msg.name) }
            date={date}
            className={mymsg && styles.msgbox}
          />)
})}
      </div>
      <div className={styles.formContainer}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
