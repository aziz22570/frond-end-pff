import React, { useEffect, useRef, useState } from "react";
import RoomCreation from "./RoomCreation ";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

const url = "http://localhost:5000";
const token = localStorage.getItem("token");

const Contact = () => {
  const [videoStreams, setVideoStreams] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const videoGrid = useRef();
  const localStream = useRef(null);
  const [me, setMe] = useState();
  const socket = useRef(null);
  useEffect(() => {
    if (socket.current == null) {
      socket.current = io(url);
    }
    const meId = uuidV4();
    const peer = new Peer(meId, {
      path: "/myapp",
      host: "localhost",
      port: "9000",
    });
    setMe(peer);
    peer.on("open", (id) => {
      setUserId(id);
    });

    socket.current.on("user-connected", (userId) => {
      console.log("User connected: " + userId);
    });

    socket.current.on("user-disconnected", (userId) => {
      console.log("User disconnected: " + userId);
    });

    socket.current.on("get-users", ({ participants }) => {
      console.log("participants:", participants);
    });

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        localStream.current = stream;
        addVideoStream(meId, stream);

        peer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(call.peer, userVideoStream);
          });
        });
        socket.current.on("user-joined", ({ peerId }) => {
          console.log(peerId, "has joined");
          connectToNewUser(peerId, stream);
        });

        socket.current.on("user-leaved", (peerId) => {
          disconnectToUser(userId);
        });
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

    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      socket.current.disconnect();
      peer.destroy();
    };
  }, []);

  const joinRoom = () => {
    if (roomId && me) {
      socket.current.emit("join-room", { roomId, peerId: me._id });
    }
  };
  const createRoom = () => {
    if (me) {
      socket.current.emit("create-room");
    }
  };

  const handleInputValue = (e) => {
    setRoomId(e.target.value);
  };

  return (
    <>
      <div>
        <div></div>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={handleInputValue}
        />
        <button onClick={joinRoom}>Join Room</button>
        <button onClick={createRoom}>Create Room</button>
        <div ref={videoGrid}>
          {videoStreams.map(({ peerId, stream }) => {
            const videoRef = (video) => {
              if (video) {
                video.srcObject = stream;
                video.addEventListener("loadedmetadata", () => {
                  video.play();
                });
              }
            };
            return (
              <video
                key={peerId}
                ref={videoRef}
                id={peerId}
                muted={peerId === me._id ? true : false}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Contact;
