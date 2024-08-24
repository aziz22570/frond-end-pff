import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams ,useSearchParams} from "react-router-dom";
import { io } from "socket.io-client";
import { v4 as uuidV4 } from "uuid";
import {  videoOn,videoOff ,soundOff,soundOn} from "../../../store/socketSlice.js";
import { useDispatch } from "react-redux";
import RoomNav from "./RoomNav.jsx";
import { endMeet, startMeet } from "../../../store/authSlice.js";
import styles from './styles.module.css'
import { disconnectPeer } from "../../../store/peerSlice.js";

const Room = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const { codeRoom } = useParams();
  const [videoStreams, setVideoStreams] = useState([]);
  const [roomId, setRoomId] = useState(codeRoom);
  const [showVideo, setShowVideo] = useState(useSelector((state)=>state.socket.video));
  const [openSound, setOpenSound] = useState(useSelector((state)=>state.socket.sound));

  const [streamOn, setStreamOn] = useState(false);
  const [participants,setParticipants] = useState([])
  const localStream = useRef(null);
  const socket = useSelector((state) => state.socket.socket);
  const peer = useSelector((state) => state.peer.peer);
  if(!peer){
    navigate("/formation/room/")
  }
  useEffect(() => {
    peer.on("open", (id) => {
      console.log("id: " + id);
    });
    socket.on("request-join", ({ peerId }) => {
      alert(`${peerId} wan to join you`);
    });
    socket.on("user-connected", (userId) => {
      console.log("User connected: " + userId);
    });

    socket.on("user-disconnected", (userId) => {
      console.log("User disconnected: " + userId);
    });

    socket.on("get-users", ({ participants }) => {
      console.log("participants:", participants);
      setParticipants(participants);
    });

    socket.on("room-created", ({ roomId }) => {
      console.log("useeeeeeeeeeeeeeeername", roomId);

      setRoomId(roomId);
    });
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        localStream.current.srcObject = stream;
        setStreamOn(true)
        console.log("strem inside the video");
        // addVideoStream(peer._id, stream);

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            addVideoStream(call.peer, userVideoStream);
          });
        });
        socket.on("user-joined", ({ peerId }) => {
          console.log(peerId, "has joined");
          connectToNewUser(peerId, stream);
        });
        socket.on("room-joined", ({ roomId }) => {
          setRoomId(roomId);
        });

        socket.on("user-leaved", (peerId) => {
          disconnectToUser(peerId);
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });

    const connectToNewUser = (peerId, stream) => {
      const call = peer.call(peerId, stream);
      call.on("stream", (userVideoStream) => {
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
    };
    const disconnectToUser = (peerId) => {
      setVideoStreams((prevStreams) =>
        prevStreams.filter((videoStream) => videoStream.peerId !== peerId)
      );
    };

    window.addEventListener("beforeunload", disconect);
    const video = localStream.current;
    return () => {
      window.removeEventListener("beforeunload", () => disconect);

      if ( video) {
video.srcObject.getVideoTracks().map(track =>track.stop())
      disconect();
    };}
  }, [roomId]);

  const disconect = () => {
    socket.emit("disconnectingg", { peerId: peer._id, roomId: roomId });
    socket.disconnect();
    peer.destroy();
  };

  // const toggleVideo = () => {
  //   const videoTrack = localStream.current.getTracks().find((track) => track.kind === "video");
  //   videoTrack.enabled ? videoTrack.enabled = false : videoTrack.enabled = true;
  // };
  
  const toggleVideo = () => {
    console.log("video togled");
    if(showVideo){
      dispatch(videoOff())
      const videoTracks = localStream.current.srcObject.getVideoTracks();
   videoTracks.forEach((track) => {
    setShowVideo(false)
     track.enabled = false;
     });
    }else{
      dispatch(videoOn())
      const videoTracks = localStream.current.srcObject.getVideoTracks();
   videoTracks.forEach((track) => {
    setShowVideo(true)

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






//   useEffect(() => {
//     if(streamOn){
//     console.log("try to close strem");
//     console.log(showVideo);
//     console.log(localStream.current);
//     console.log(localStream.current.srcObject);
//     if(showVideo === false && localStream.current && localStream.current.srcObject ){
//       console.log("this is local stream when try to toggle video",localStream.current);
//       const videoTracks = localStream.current.srcObject.getVideoTracks();
//    videoTracks.forEach((track) => {
//     setShowVideo(false)
//      track.enabled = false;
//      });
//    }
//    if(openSound === false && localStream.current && localStream.current.srcObject ){
//    const audioTracks = localStream.current.srcObject.getAudioTracks();
//    audioTracks.forEach((track) => {
//     setOpenSound(false);
//     track.enabled = false;
//   });
  
// }
//   }
//   },[streamOn])


  // const getGridStyle = () => {
  //   const rows = Math.ceil(Math.sqrt(participants.length));
  //   const columns = Math.ceil(participants.length / rows);
  //   console.log("rows: ",rows, "columns: ",columns);
  //   return {
  //     gridTemplateRows: `repeat(${rows}, 1fr)`,
  //     gridTemplateColumns: `repeat(${columns}, 1fr)`,
  //   };
  // };






  return (
    <div className={styles.roomContainer}>
      <div className={styles.videosContainer}>
        <div  className={styles.videoContainer}><video width="100%" height="100%" ref={localStream} autoPlay muted></video></div>
      
      {videoStreams?.map(({ peerId, stream }) => {
        const videoRef = (video) => {
          if (video) {
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
              video.play();
            });
          }
        };
        return (
          <div  className={styles.videoContainer}>  
            <video
            key={peerId}
            ref={videoRef}
            id={peerId}
            muted={peerId === peer._id ? true : false}
          /></div>
        
        );
      })}
      </div>
  
  <RoomNav toggleSound={toggleSound} toggleVideo={toggleVideo} />
    </div>
  );
};

export default Room;
