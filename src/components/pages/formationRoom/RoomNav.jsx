import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Button from "../../common/button/Button";
import { FiCamera, FiCameraOff } from "react-icons/fi";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { MdMessage } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const RoomNav = ({
  toggleVideo,
  toggleSound,
  handleChatMeet,
  openSound,
  showVideo,
  showChatmeet,
}) => {
  const navigate = useNavigate()
  const { codeRoom,formationId } = useParams();
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.user);

  const endMeetHandle = ()=>{
    socket?.emit("end-meet",{meetId:codeRoom,formationId})
    console.log(codeRoom,formationId);
  }
  useEffect(() => {
    socket?.on("meet-ended",({formationId,formationName})=>{
      console.log("ended",formationId,formationName);
      if(formationId && formationName){  navigate(`/formation/${formationId}/${formationName}`)}
    
    })
  

  }, [socket])
  const leaveMeetHandle = ()=>{
    navigate(`/`)

  }
  
  return (
    <div className={styles.navBar}>
      <div className={styles.buttonBox}>
        <Button
          style={
            showVideo
              ? { backgroundColor: "white", border: "2px solid rebeccapurple" }
              : {
                  backgroundColor: "rebeccapurple",
                  border: "2px solid rebeccapurple",
                }
          }
          text={
            showVideo ? (
              <FiCamera size={25} className={styles.cameraIcon} />
            ) : (
              <FiCameraOff size={25} />
            )
          }
          type={showVideo && "rounded"}
          w="r50"
          onClick={toggleVideo}
        />
        <Button
          style={
            openSound
              ? { backgroundColor: "white", border: "2px solid rebeccapurple" }
              : {
                  backgroundColor: "rebeccapurple",
                  border: "2px solid rebeccapurple",
                }
          }
          text={
            openSound ? (
              <CiMicrophoneOn className={styles.microIcon} size={25} />
            ) : (
              <CiMicrophoneOff size={25} />
            )
          }
          type={openSound && "rounded"}
          w="r50"
          onClick={toggleSound}
        />
        <Button
          style={{
            backgroundColor: "white",
            border: "2px solid rebeccapurple",
          }}
          text={<MdMessage size={25} className={styles.cameraIcon} />}
          type={showChatmeet && "rounded"}
          w="r50"
          onClick={handleChatMeet}
        />
      </div>
      <button className={styles.leaveBtn} onClick={user.role === "Teacher" ? endMeetHandle : leaveMeetHandle}>{user.role === "Teacher" ? "End Meet" : "leave meet"}</button>
    </div>
  );
};

export default RoomNav;
