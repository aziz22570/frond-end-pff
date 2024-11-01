import React, { useEffect, useRef, useState } from "react";
import { MessageBox, MessageList } from "react-chat-elements";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { sendCours } from "../../../API/courseApi";
import { saveAs } from "file-saver";
import axios from "axios";
import Button from "../../common/button/Button";

const CoursRoom = ({ courRoom }) => {
  const [fileData, setFileData] = useState(null);
  const [courses, setCourses] = useState(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  // const [data, setData] = useState([]);
  const socket = useSelector((state) => state.socket.socket);
  console.log("courRoom", courRoom);
  useEffect(() => {
    if (socket) {
      socket.emit("join-cours-room", courRoom);

      socket.on("initialCourses", (initialCourses) => {
        setCourses(initialCourses);
        console.log("initialCourses", initialCourses);
      });

      socket.on("receiveCourse", (message) => {
        console.log("the message", message);
        setCourses((prevCoures) => [...prevCoures, {name:message.filename,path:message.path,sender: message.sender}]);
      });
      socket.on("room-chat-created", (data) => {
        console.log("data", data);
      });
    }
    return () => {
      setCourses([]);
    };
  }, [socket, courRoom]);

  const imageHandler = (e) => {
    console.log(courRoom);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("coursRoomId", courRoom);
    setFileData(formData);
  };
  const sendFileHandler = async () => {
    console.log(courRoom);
    fileData && courRoom &&
    await sendCours(fileData,courRoom);
    fileInputRef.current.value = ""; 
  };

  // const downloadFile = (fileName) => {
  //   saveAs(`http://localhost:5000/cours/${fileName}`,fileName);
  // };

  const downloadFile = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/cours/${fileName}`, {
        responseType: 'blob',
      });
      const contentDisposition = response.headers['content-disposition'];
      let actualFileName = fileName;
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2) {
          actualFileName = fileNameMatch[1];
        }
      }
      saveAs(response.data, actualFileName);
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };
  useEffect(() => {
    // Scroll to the bottom of the container when the messages array length changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [courses?.length]); // Dependency on the length of the messages array


  return (
    <div className={styles.container}>
      <h1 className="mb-4">Cour Room</h1>

      <div className={styles.courContainr} ref={containerRef}>
        {courses?.map((crs, index) => {
          const date = new Date(crs.date);
          console.log("the course",crs);
          const mymsg = (crs.sender._id === user._id || crs.sender === user._id)

          console.log(` http://localhost:5000/cours/${crs.path} `);
          return (
            <MessageBox
              key={index}
              position={mymsg ? "right" : "left"}
              type={"file"}
              text={crs.name}
              title={!mymsg && crs.sender.username}
              date={date}
              data={{
                uri: `http://localhost:5000/cours/${crs.path}`,
                status: {
                  click: false,
                  loading: 0,
                },
              }}
              className={mymsg && styles.msgbox}
              onClick={() =>
                downloadFile(crs.path)
              }
            />
          );
        })}
      </div>
      <div className={styles.formContainer}>
        <input className={styles.uploadFile} type="file" onChange={imageHandler} ref={fileInputRef} />
        <Button parentStyle={{height: "100%"}} style={{height: "100%"}} text={"Send"} type={"bgw"} w="w100" onClick={sendFileHandler} />
      </div>
    </div>
  );
};

export default CoursRoom;
