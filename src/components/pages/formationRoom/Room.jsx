import React, { useEffect, useRef, useState } from "react";
import { endMeet, startMeet } from "../../../store/authSlice.js";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./styles.module.css";
import RoomNav from "./RoomNav";
import { useDispatch } from "react-redux";
import {
  soundOff,
  soundOn,
  videoOff,
  videoOn,
} from "../../../store/socketSlice";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./grid.css";
import { Input } from "react-chat-elements";
import ChatMeet from "./chatmeet/ChatMeet.jsx";

const Room = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { codeRoom,formationId } = useParams();

  const user = useSelector((state) => state.user.user);

  const socket = useSelector((state) => state.socket.socket);
  const peer = useSelector((state) => state.peer.peer);
  const [videoStreams, setVideoStreams] = useState([]);
  const localStream = useRef(null);
  const [streamOn, setStreamOn] = useState(false);
  const [showVideo, setShowVideo] = useState(
    useSelector((state) => state.socket.video)
  );
  const [openSound, setOpenSound] = useState(
    useSelector((state) => state.socket.sound)
  );
  const [showChatmeet,setChowChatMeet] = useState(false);
  const [messages,setMessages] = useState([])


  if (!peer) {
    navigate("/formation/room/");
  }
  socket.emit("seend-peer", { peerId: peer._id, meetId: codeRoom });

  useEffect(() => {
    peer.on("open", (id) => {
      console.log("id: " + id);
    });

    console.log(peer);

    // socket.on("new-user-joined", ({ peerId }) => {
    //   console.log(`Received 'user-joined' event with peerId: ${peerId}`);
    //   alert(peerId, "has joined")
    // console.log(peerId, "has joined");
    // connectToNewUser(peerId, stream);
    // })
    socket.on("request-join", ({ socketId, userId, meetId, peerId }) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          socket.emit("req-accepted", {
            meetId,
            newuserId: userId,
            newUserSocketId: socketId,
            peerId,
          });
        }
      });
    });

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        localStream.current.srcObject = stream;
        setStreamOn(true);
        // addVideoStream(peer._id, stream);

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            addVideoStream(call.peer, userVideoStream);
          });
        });
        socket.on("new-user-joined", ({ peerId }) => {
          console.log(peerId, "has joined");
          connectToNewUser(peerId, stream);
        });

        // socket.on("room-joined", ({ roomId }) => {
        //   setRoomId(roomId);
        // });

        socket.on("user-leaved", ({peerId}) => {
          console.warn('user-leaved', peerId);
          disconnectToUser(peerId);
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });

    const connectToNewUser = (peerId, stream) => {
      const call = peer.call(peerId, stream);
      call.on("stream", (userVideoStream) => {
        console.log(("userVideoStream", userVideoStream));
        addVideoStream(peerId, userVideoStream);
      });
    };

    const addVideoStream = (peerId, stream) => {
      setVideoStreams((prevStreams) => {
        if (prevStreams.some((videoStream) => videoStream.peerId === peerId)) {
          return prevStreams;
        }
        return [...prevStreams, { peerId, stream }];
      });
      console.log(videoStreams);
    };
    const disconnectToUser = (peerId) => {
      setVideoStreams((prevStreams) =>
        prevStreams.filter((videoStream) => videoStream.peerId !== peerId)
      );
    };

    console.log("videoStreams", videoStreams.length);
    window.addEventListener("beforeunload", disconect);
    const video = localStream.current;
    return () => {
      window.removeEventListener("beforeunload", () => disconect);

      if ( video) {
video.srcObject.getVideoTracks().map(track =>track.stop())
      disconect();
    };}
  
  }, [codeRoom,openSound,showVideo]);
  const disconect = () => {
    socket.emit("disconnectingg", { peerId: peer._id, roomId: codeRoom,role:user.role ,formationId});
    socket.disconnect();
    peer.destroy();
  };

  const toggleSound = () => {
    if (openSound) {
      dispatch(soundOff());
      const audioTracks = localStream.current.srcObject.getAudioTracks();
      audioTracks.forEach((track) => {
        setOpenSound(false);
        track.enabled = false;
      });
    } else {
      dispatch(soundOn());
      const audioTracks = localStream.current.srcObject.getAudioTracks();
      audioTracks.forEach((track) => {
        setOpenSound(true);
        track.enabled = true;
      });
    }
  };

  const toggleVideo = () => {
    if (showVideo) {
      dispatch(videoOff());
      const videoTracks = localStream.current?.srcObject?.getVideoTracks();
      videoTracks.forEach((track) => {
        setShowVideo(false);
        track.enabled = false;
      });
    } else {
      dispatch(videoOn());
      const videoTracks = localStream.current?.srcObject?.getVideoTracks();
      videoTracks.forEach((track) => {
        setShowVideo(true);

        track.enabled = true;
      });
    }
  };
  useEffect(() =>{
    dispatch(startMeet())
    return () => {
      dispatch(endMeet())
    }
    
  },[dispatch]);

const handleChatMeet = ()=>{
  setChowChatMeet(!showChatmeet);
}


  return (
    <div className={styles.roomContainer}>
      <section className={styles.main}>
        <div
          className={`${styles.roomVideosContainer} ${
            videoStreams.length >= 8
              ? styles["usersScroll"]
              : styles[`users${videoStreams.length + 1}`]
          }`}
        >
          <div className={`${styles[`vid1`]} ${styles.roomVideoContainer}`}>
            <video
              ref={localStream}
              autoPlay
              muted
            ></video>
          </div>

          {videoStreams?.map(({ peerId, stream },index) => {
            const videoRef = (video) => {
              if (video) {
                video.srcObject = stream;
                video.addEventListener("loadedmetadata", () => {
                  video.play();
                });
              }
            };
            return (
              <div className={`${styles[`vid${[index+2]}`]} ${styles.roomVideoContainer}`}>
                <video
                  key={peerId}
                  ref={videoRef}
                  id={peerId}
                  muted={peerId === peer._id ? true : false}
                />
              </div>
            );
          })}
        </div>
      
{showChatmeet && <ChatMeet messages={messages} setMessages={setMessages}/>}
      </section>

      <RoomNav toggleSound={toggleSound}  openSound={openSound}  toggleVideo={toggleVideo} showVideo={showVideo} handleChatMeet={handleChatMeet} showChatmeet={showChatmeet}/>
      
    </div>
  );
};

export default Room;
