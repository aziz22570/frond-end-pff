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