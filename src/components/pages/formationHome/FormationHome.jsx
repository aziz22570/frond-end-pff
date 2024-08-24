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
import { useParams } from "react-router-dom";
import ContactFormationForm from "../../common/form/contactFormationForm/ContactFormationForm";
import Modal from "../../common/modal/Modal";
import {
  handleChatRoomForm,
  handleCoursRoomForm,
} from "../../../store/popupSlice";
import ContactFormationFormm from "../../common/form/contactFormationForm/ContactFormationForm";
import { useSelector } from "react-redux";
import ChatroomForm from "../../common/form/chatroomForm/ChatroomForm";
import CoursRoom from "../coursRoom/CoursRoom";
import CourroomForm from "../../common/form/courroomForm/CourroomForm";
import { initializeSocket } from "../../../store/socketSlice";
const FormationHome = () => {
  const { id } = useParams();
  const chatroomForm = useSelector((state) => state.form.chatroom);
  const coursroomForm = useSelector((state) => state.form.courroom);

  const { formation, loading, error } = useFetchFormation(id);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [chatRoom, setCahtRoom] = useState();
  const [chatRooms, setChatRooms] = useState(formation.chatrooms);
  const [courRoom, setCourRoom] = useState(formation.courseroom);
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.user);

  console.log("chatRooms chatRooms", chatRooms);
  const dispatch = useDispatch();
  console.log("formation test", formation);
  console.log("formation test cour room", courRoom);

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
    }
  }, [socket]);
  useEffect(() => {
    setChatRooms(formation.chatrooms);
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
        return <>gg</>;
    }
  };
  const openChatComponent = (chatRoom) => {
    console.log("the room chat component", chatRoom);
    setCahtRoom({});

    setSelectedComponent("");
    setCahtRoom(chatRoom);
  };

  return (
    <>
      {chatroomForm && (
        <Modal onClick={createRoom}>
          <ChatroomForm id={id} />
        </Modal>
      )}
      {coursroomForm && (
        <Modal onClick={createCoursRoom}>
          <CourroomForm id={id} />
        </Modal>
      )}
      <div className={styles.container} style={{ display: "flex" }}>
        <Sidebar>
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
                <MenuItem onClick={createRoom}> Cree New Chat Room </MenuItem>
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
        </Sidebar>
        <div
          className={styles.main}
          style={{ marginLeft: "20px", padding: "20px", width: "100%" }}
        >
          <h1 className={styles.title}>
            {selectedComponent === "Component2" && "START YOUR OWN MEET"}
          </h1>
          {chatRoom && !selectedComponent && <ChatRoom chatRoom={chatRoom} />}
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default FormationHome;
