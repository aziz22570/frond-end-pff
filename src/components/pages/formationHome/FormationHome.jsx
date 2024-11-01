import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from "./styles.module.css";
import Profile from "../profile/Profile";
import FormationRoom from "../formationRoom/FormationRoom";
import Formations from "../formations/Formations";
import { useDispatch } from "react-redux";
import { endMeet, startMeet } from "../../../store/authSlice";
import ChatRoom from "../chatRoom/ChatRoom";
import { useFetchFormation } from "../../../API/formationApi";
import { useNavigate, useParams } from "react-router-dom";
import ContactFormationForm from "../../common/form/contactFormationForm/ContactFormationForm";
import Modal from "../../common/modal/Modal";
import {
  handleChatRoomForm,
  handleCoursRoomForm,
  handleQuizRoomForm,
} from "../../../store/popupSlice";
import ContactFormationFormm from "../../common/form/contactFormationForm/ContactFormationForm";
import { useSelector } from "react-redux";
import ChatroomForm from "../../common/form/chatroomForm/ChatroomForm";
import CoursRoom from "../coursRoom/CoursRoom";
import CourroomForm from "../../common/form/courroomForm/CourroomForm";
import { initializeSocket } from "../../../store/socketSlice";
import QuizRoom from "../quizRoom/QuizRoom";
import QuizForm from "../../common/form/quizForm/QuizForm";
import { TbLogout2 } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import Home from "./Home";
import StudentQuizRoom from "../quizRoom/StudentQuizRoom";
import { ThreeCircles } from 'react-loader-spinner'


const FormationHome = () => {
  const { id } = useParams();
  console.log("the formation id is ",id);
  const chatroomForm = useSelector((state) => state.form.chatroom);
  const quizRoomForm = useSelector((state) => state.form.quizRoom);
  const coursroomForm = useSelector((state) => state.form.courroom);

  const { formation, loading, error } = useFetchFormation(id);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [chatRoom, setCahtRoom] = useState();
  const [chatRooms, setChatRooms] = useState(formation.chatrooms);
  const [quizzes, setQuizzes] = useState(formation.quizzes);
  const [quizRoom, setQuizRoom] = useState();
  const [courRoom, setCourRoom] = useState(formation.courseroom);
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate()
  console.log("chatRooms chatRooms", chatRooms);
  const dispatch = useDispatch();
  console.log("formation test", formation);
  console.log("formation test cour room", courRoom);

  if(!id){navigate("/")}
  useEffect(() => {
    dispatch(initializeSocket());
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("room-chat-created", (data) => {
        setChatRooms((prev) => [...prev, data]);
      });
      socket.on("room-cours-created", (data) => {
        setCourRoom(data._id);
        console.log("the cours data", data);
      });
      socket.on("quiz-created", (data) => {
        setQuizzes((prev) => [...prev, data]);
      });
    }
    return () => {
      socket && socket.off("quiz-created");
    };
  }, [socket]);
  useEffect(() => {
    setChatRooms(formation.chatrooms);
  }, [formation]);
  useEffect(() => {
    setQuizzes(formation.quizzes);
  }, [formation]);
  useEffect(() => {
    setCourRoom(formation.courseroom);
  }, [formation]);
  useEffect(() => {
    dispatch(startMeet());
    return () => {
      dispatch(endMeet());
    };
  }, []);
  const createRoom = () => {
    dispatch(handleChatRoomForm());
  };
  const createQuiz = () => {
    dispatch(handleQuizRoomForm());
  };
  const createCoursRoom = () => {
    dispatch(handleCoursRoomForm());
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Component1":
        return <ChatRoom />;
      case "Component2":
        return <FormationRoom />;
      case "Component3":
        return <CoursRoom courRoom={courRoom} />;
      default:
        return <Home />;
    }
  };
  const openChatComponent = (chatRoom) => {
    console.log("the room chat component", chatRoom);
    setCahtRoom();
    setQuizRoom();

    setSelectedComponent("");
    setCahtRoom(chatRoom);
  };
  const openQuizComponent = (quiz) => {
    console.log("the room quiz component", quiz);
    setCahtRoom();
    setQuizRoom();
    setSelectedComponent("");
    setQuizRoom(quiz);
  };
const handleHome = () => {
  navigate('/')
}
const homeNavigate = ()=>{setSelectedComponent("home")}
if(loading) return(<div className="d-flex justify-content-center align-items-center" style={{
  width: "100%",
  height: "100%"
}}>
  <ThreeCircles
visible={true}
height="100"
width="100"
color="#rgb(0, 171, 228)"
ariaLabel="three-circles-loading"
wrapperStyle={{}}
wrapperClass=""
/>;
  </div>)
  
  return (
    <>
      {chatroomForm && (
        <Modal onClick={createRoom}>
          <ChatroomForm id={id} />
        </Modal>
      )}
      {quizRoomForm && (
        <Modal onClick={createQuiz}>
          <QuizForm id={id} />
        </Modal>
      )}
      {coursroomForm && (
        <Modal onClick={createCoursRoom}>
          <CourroomForm id={id} />
        </Modal>
      )}
      <div className={styles.container} style={{ display: "flex" }}>
        <Sidebar>
          <div className={styles.homeBtnContainer}>

            <IoHome className={styles.homeBtn} size={25} onClick={homeNavigate}/>
          </div>
          
          <Menu iconShape="square">
            <SubMenu label="Chat Rooms">
              {chatRooms?.map((chatRoom) => {
                return (
                  <MenuItem onClick={() => openChatComponent(chatRoom)}>
                    {chatRoom.name}
                  </MenuItem>
                );
              })}
              {user.role === "Teacher" && (
                <MenuItem onClick={createRoom}> create New Chat Room </MenuItem>
              )}
            </SubMenu>

            <SubMenu label="Quizzes">
              {quizzes?.map((quiz) => {
                return (
                  <MenuItem onClick={() => openQuizComponent(quiz)}>
                    {quiz.name}
                  </MenuItem>
                );
              })}
              {user.role === "Teacher" && (
                <MenuItem onClick={createQuiz}> create New Quiz </MenuItem>
              )}
            </SubMenu>

            <MenuItem onClick={() => setSelectedComponent("Component2")}>
              Meet Room
            </MenuItem>
            {courRoom ? (
              <MenuItem onClick={() => setSelectedComponent("Component3")}>
                Cours Room
              </MenuItem>
            ) : (
              user.role === "Teacher" &&
              !formation.courseroom && (
                <MenuItem onClick={createCoursRoom}>
                  Cree New Cours Room
                </MenuItem>
              )
            )}
          
          </Menu>
          <div className={styles.btnContainer}>
              <button onClick={handleHome}><TbLogout2 size={15}/>Log Out</button>
          </div>
        </Sidebar>
        <div
          className={styles.main}
          style={{ marginLeft: "20px", width: "100%" }}
        >
          
            {selectedComponent === "Component2" && <h1 className={styles.title}>START YOUR OWN MEET</h1>}
          
          {chatRoom && !quizRoom && !selectedComponent && (
            <ChatRoom chatRoom={chatRoom} />
          )}
          {quizRoom && !chatRoom && !selectedComponent && (
            user.role === "Teacher" ? <QuizRoom  quizId={quizRoom._id} quizName={quizRoom.name} formationId={id}/> : <StudentQuizRoom quizId={quizRoom._id} quizName={quizRoom.name} formationId={id}/>
          )}
          {((!quizRoom && !chatRoom) ||  selectedComponent) && renderComponent()}
        </div>
        
      </div>

    </>
  );
};

export default FormationHome;
