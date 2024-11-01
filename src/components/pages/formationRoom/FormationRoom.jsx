import React, { useState, useEffect, useRef } from "react";
import RoomCreation from "./RoomCreation ";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  videoOn,
  videoOff,
  soundOff,
  soundOn,
} from "../../../store/socketSlice.js";
import { initializePeer } from "../../../store/peerSlice.js";
import styles from "./styles.module.css";
import Button from "../../common/button/Button.jsx";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { FiCamera, FiCameraOff } from "react-icons/fi";
import { useFetchFormation } from "../../../API/formationApi.js";
import { getUserMedia } from "./utils/getUserMedia.js";
import { ThreeCircles } from 'react-loader-spinner'

const token = localStorage.getItem("token");


const FormationRoom = () => {
  const { id } = useParams();
  const [streamOn, setStreamOn] = useState(false);
  const dispatch = useDispatch();
  const myStream = useRef(null);
  const [showVideo, setShowVideo] = useState(useSelector((state) => state.socket.video));
  const [openSound, setOpenSound] = useState(useSelector((state) => state.socket.sound));
  const user = useSelector((state) => state.user.user);
  const socket = useSelector((state) => state.socket.socket);
  const peer = useSelector((state) => state.peer.peer);
  console.log("first peer ", peer);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);






  useEffect(() => {
    dispatch(initializePeer());
  }, [dispatch]);

  useEffect(() => {
    socket.on('error', (error) => {
      console.error("Socket error:", error);
    });
    if (socket) {
      socket.on("meet-created", (roomId) => {
        console.log("roomId", roomId);
        console.log("peer", peer);
        if (roomId && peer) {
          socket.emit("join-room", { roomId, peerId: peer._id });
          navigate(`/formation/room/${id}/${roomId}`);
        }
      });
      socket.on("joined", ({meetId}) => {
        console.log(meetId);
        navigate(`/formation/room/${id}/${meetId}`);
      });

    }
  }, [socket, peer]);

  const joinRoom = () => {
    console.log("join room started",roomId,peer,id);
    if (roomId && peer && id) {
    setDisabled(true)

      // socket.emit("join-room", { roomId, peerId: peer._id });
      socket.emit("join-meet", {
        userName: user.username,
        meetId: roomId,
        peerId: peer._id,
      });
    }
  };

  const createRoom = () => {
    console.log("the socket is",socket);
    
    if (socket.connected) {
      console.log("create room", id);
    }
    socket?.emit("create-meet", { formationId: id });
  };

  const handleInputValue = (value) => {
    setRoomId(value);
  
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    getUserMedia()
      .then((stream) => {
        console.log("the straem is",stream);
        if(stream){myStream.current.srcObject = stream;
        setStreamOn(true);}
        else{throw new Error("no stream")}
        
      })
      .catch((error) => {
        setError("Failed to access media devices.");
        console.error("Error accessing media devices.", error);
      }).finally(() => {
        setLoading(false);
      })
    const video = myStream.current;
    return () => {
      video.srcObject?.getTracks().forEach((track) => {
        track.stop();
      });
    };
    
  }, []);
  const toggleVideo = () => {
    if (showVideo) {
      dispatch(videoOff());
      const videoTracks = myStream.current?.srcObject?.getVideoTracks();
      videoTracks?.forEach((track) => {
        setShowVideo(false);
        track.enabled = false;
      });
    } else {
      dispatch(videoOn());
      const videoTracks = myStream.current?.srcObject?.getVideoTracks();
      videoTracks?.forEach((track) => {
        setShowVideo(true);

        track.enabled = true;
      });
    }
  };

  const toggleSound = () => {
    if (openSound) {
      dispatch(soundOff());
      const audioTracks = myStream.current?.srcObject?.getAudioTracks();
      audioTracks?.forEach((track) => {
        setOpenSound(false);
        track.enabled = false;
      });
    } else {
      dispatch(soundOn());
      const audioTracks = myStream.current?.srcObject?.getAudioTracks();
      audioTracks?.forEach((track) => {
        setOpenSound(true);
        track.enabled = true;
      });
    }
  };

  useEffect(() => {
    if (streamOn) {
      console.log("try to close strem");
      console.log(showVideo);
      console.log(myStream.current);
      console.log(myStream.current.srcObject);
      if (
        showVideo === false &&
        myStream.current &&
        myStream.current.srcObject
      ) {
        console.log(
          "this is local stream when try to toggle video",
          myStream.current
        );
        const videoTracks = myStream.current.srcObject.getVideoTracks();
        videoTracks.forEach((track) => {
          setShowVideo(false);
          track.enabled = false;
        });
      }
      if (
        openSound === false &&
        myStream.current &&
        myStream.current.srcObject
      ) {
        const audioTracks = myStream.current.srcObject.getAudioTracks();
        audioTracks.forEach((track) => {
          setOpenSound(false);
          track.enabled = false;
        });
      }
    }
  }, [streamOn]);
if(loading){
  // return (<div className="d-flex justify-content-center align-items-center" style={{
  //   width: "100%",
  //   height: "100%"
  // }}>
  //   <ThreeCircles
  // visible={true}
  // height="100"
  // width="100"
  // color="#rgb(0, 171, 228)"
  // ariaLabel="three-circles-loading"
  // wrapperStyle={{}}
  // wrapperClass=""
  // />;
  //   </div>)
}

  return (
    <>
        
          {error && <p>{error}</p>}
      <div className={styles.container}>
        <div
          className={`${showVideo ? styles.showVideo : styles.hideVideo} ${
            styles.videoContainer
          }`}
        >
          <video
            className={styles.video}
            width="100%"
            height="100%"
            ref={myStream}
            autoPlay
          />
          <div className={styles.videoButtonContainer}>
            <Button
              text={
                showVideo ? <FiCamera size={20} /> : <FiCameraOff size={20} />
              }
              type={showVideo ? "rounded" : "redRounded"}
              w="r50"
              onClick={toggleVideo}
            />
            <Button
              text={
                openSound ? (
                  <CiMicrophoneOn size={20} />
                ) : (
                  <CiMicrophoneOff size={20} />
                )
              }
              type={openSound ? "rounded" : "redRounded"}
              w="r50"
              onClick={toggleSound}
            />
          </div>
        </div>
        <div className={styles.homeFormContainer}>
          <RoomCreation
            joinRoom={joinRoom}
            createRoom={createRoom}
            roomId={roomId}
            handleInputValue={handleInputValue}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
};

export default FormationRoom;
