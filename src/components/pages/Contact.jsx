import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import { apiAdminSendEmail, apiuserSendEmail } from "../../API/email";
import { useSelector } from "react-redux";
import { handleLoginForm } from "../../store/popupSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import RecivedEmail from "./RecivedEmail";

const Contact = () => {
  const { destinationId , name} = useParams();
  const user = useSelector((state) => state?.user?.user);
  const isLoggedIn = useSelector((state) => state?.user.isLoggedIn);
  const [username, setUsername] = useState(isLoggedIn ? user.username : "");
  const [email, setEmail] = useState(isLoggedIn ? user.email : "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [destination, setDestination] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    isLoggedIn ? setUsername(user.username) : setUsername("");
    isLoggedIn ? setEmail(user.email) : setEmail("");
  }, [isLoggedIn, user]);
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(handleLoginForm());
      return;
    }
    selectedOption === "admin" ? apiAdminSendEmail(username, email, title, content) :
    apiuserSendEmail(username, email, title, content,destinationId)
    
    setTitle("");
    setContent("");
  };
  useEffect(() => {
    if (destinationId && name) {
      setDestination(name);
      setSelectedOption("user");
    } else {
      setDestination("Admin");
    }
    
  
  
  }, [])
  
  return (
    <div className="d-flex">
    <div
      style={{
        width: "80vw",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form style={{ width: "45vw" }}>
        <fieldset style={{ display: "flex", flexDirection: "column" }}>



          <div>
          <label for="username" class="form-label mt-4">
                UserName:{" "}
              </label>
              <input
                type="text"
                class="form-control"
                id="username"
                value={username}
                disabled={isLoggedIn}
                onChange={handleUsername}
              />
          </div>

          <div>
          <label for="email" class="form-label mt-4">
                Email Address:{" "}
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                disabled={isLoggedIn}
                onChange={handleEmail}
              />
          </div>
          <div style={{ display: "flex" ,width:"100%"}}>
            <div style={{ width:"30%",marginRight: "10%"}}>
            <label for="choice" class="form-label mt-4">
              to:
            </label>
            <select onChange={handleSelectChange} value={selectedOption} class="form-select" id="choice">
              {destinationId && name ?  (<>
                <option value={"admin"}>Admin</option>
              <option value={"user"}>User</option>
              </>):(<option value={"admin"}>Admin</option>)}
            </select>
            </div>
            <div style={{ width:"60%"}}>
            <label for="username" class="form-label mt-4">
              Destination:{" "}
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              value={selectedOption === "admin" ? "Administrator" : destination}
              disabled={true}
            />
            </div>
          </div>

          <div>
            <label for="tile" class="form-label mt-4">
              Title:{" "}
            </label>
            <input
              type="text"
              class="form-control"
              id="tile"
              value={title}
              onChange={handleTitle}
            />
          </div>

          <div>
            <label for="content" class="form-label mt-4">
              Content:{" "}
            </label>
            <textarea
              class="form-control"
              id="content"
              rows="4"
              value={content}
              onChange={handleContent}
            ></textarea>
          </div>

          <Button
            parentStyle={{ alignSelf: "center", marginTop: "20px" }}
            text="Send"
            type="bgw"
            w="w200"
            onClick={handleSendEmail}
          />
        </fieldset>
      </form>
    </div>

     
    {/* <RecivedEmail/> */}
    </div>
  );
};

export default Contact;
