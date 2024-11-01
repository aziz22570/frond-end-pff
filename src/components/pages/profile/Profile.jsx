import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { FaPen } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../../common/button/Button";
import { useMyFormation } from "../../../API/formationApi";
import Card from "../../common/card/Card";
import AddCard from "../../common/card/AddCard";
import {
  handleContactInformationForm,
  handlesecuritySettingForm,
} from "../../../store/popupSlice";
import { useDispatch } from "react-redux";
import Modal from "../../common/modal/Modal";
import ContactFormationForm from "../../common/form/contactFormationForm/ContactFormationForm";
import SecuritySettingForm from "../../common/form/securitySettingForm/SecuritySettingForm";
import { useUpdateUser } from "../../../API/User";
import Rating from "react-rating";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { getRating, rateFormer } from "../../../API/rating";
import { FiUpload } from "react-icons/fi";
import Swal from "sweetalert2";

const Profile = () => {
  const hiddenFileInput = useRef(null);
  const user = useSelector((state) => state.user.user);
  const openContactInformationForm = useSelector(
    (state) => state.form.contactInformation
  );
  const openSecuritySettingForm = useSelector(
    (state) => state.form.securitySetting
  );

  const { updateData } = useUpdateUser();

  const dispatch = useDispatch();
  const [textarea, setTextarea] = useState(
    user?.about || "right some thing about yourself"
  );
  const [show, setShow] = useState(true);
  const [buttonValue, setButtonValue] = useState("Update");
  const { formations } = useMyFormation();
  const [rating, setRating] = useState(0);
  const [raters, setRaters] = useState(0);
  const [err, setErr] = useState(null);


  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await getRating({ teacher: user._id });
        if (response && response.data) {
          setRating(response.data.rating);
          setRaters(response.data.raters);
        }
      } catch (err) {
        setErr('Failed to fetch rating');
        console.error(err);
      }
    };

    fetchRating();
  }, [ user._id]);


  const [rows, setRows] = useState(
    textarea.length > 320 ? Math.ceil(textarea.length / 80) : 4
  );
  console.log("user", user);

  const handleChange = (event) => {
    setTextarea(event.target.value);
    textarea.length > 320 && setRows(Math.ceil(textarea.length / 80));
  };

  useEffect(() => {
    setButtonValue(show ? "Update" : "Save");
  }, [show]);

  const handleContactInformation = () => {
    dispatch(handleContactInformationForm());
  };
  const handleSecuritySetting = () => {
    dispatch(handlesecuritySettingForm());
  };

  const handleUpdate = async () => {
    setShow(!show);
    buttonValue === "Save" && (await updateData({ about: textarea }));
    buttonValue === "Update"
      ? setButtonValue("Save")
      : setButtonValue("Update");
  };
  const handleCancel = () => {
    setShow(!show);
    setTextarea(user?.about || "right some thing about yourself");
    setButtonValue("Update");
  };
  const imageHandler = async(e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      Swal.fire("Please select a valid image file");
    }
    else{const formData = new FormData();
    formData.append("file", file);
    await updateData(formData, "image");}
    
  };

const handleRating = (value)=>{
  rateFormer({rater: user._id, rating: value})
}
const handleClick = event => {
  if (!hiddenFileInput || !hiddenFileInput.current) return;

  hiddenFileInput.current.click();
};
  return (
    <>
      {openContactInformationForm && (
        <Modal onClick={handleContactInformation}>
          <ContactFormationForm email={user?.email} number={user?.number} />
        </Modal>
      )}
      {openSecuritySettingForm && (
        <Modal onClick={handleSecuritySetting}>
          <SecuritySettingForm />
        </Modal>
      )}
      <div className={styles.container}>
        <aside className={styles.aside}>
          <h5 className={styles.title}>Personal details</h5>
          <div className={styles.imgContainer}>
            <img
              src={
                user.image
                  ? `http://localhost:5000/usersImages/${user.image}`
                  : `http://localhost:5000/usersImages/default.jpg`
              }
              alt={`${user.name}`}
            />
            <input type="file"  accept="image/*" onChange={imageHandler} ref={hiddenFileInput} hidden/>

          </div>
          <h4>{user?.username}</h4>
          <button className={styles.uploadButton} onClick={handleClick}>Upload {<FiUpload size={22}/>}</button>
          {user.role === "Teacher" && <li className={`${styles.ratingBox} ${styles.readonlybox}`}>
              <div className={styles.rating}>
              <Rating
                readonly
                initialRating={rating || 0}
                  emptySymbol={<IoStarOutline size={30} className={styles.emptyRating}/>}
                  fullSymbol={<IoStarSharp size={30} className={styles.fullRating} />}
                  fractions={2}
                />
              </div>
              <span>{`(${raters || 0})`}</span>

            </li>}
        </aside>

        <main>
          <ul className={styles.infoContainer}>

            <li
              onClick={handleContactInformation}
              className={styles.slotContainer}
            >
              <h6>Contact information</h6>
              <IoIosArrowForward className={styles.icon} />
            </li>
            

            <li
              onClick={handleSecuritySetting}
              className={styles.slotContainer}
            >
              <h6>Security Settings:</h6>
              <IoIosArrowForward className={styles.icon} />
            </li>
            <li className={styles.aboutMe}>
              <h6>About me:</h6>
              <div>
                <textarea
                  value={textarea}
                  onChange={handleChange}
                  disabled={show}
                  maxLength="500"
                  class="form-control"
                  id="exampleTextarea"
                  cols="80"
                  rows={rows}
                  autoCorrect
                ></textarea>
                <div className={styles.btnContainer}>
                  {!show && (
                    <Button
                      text="cancel"
                      type="bgw"
                      w="w100"
                      onClick={handleCancel}
                    />
                  )}
                  <Button
                    text={buttonValue}
                    type="bgb"
                    w="w100"
                    onClick={handleUpdate}
                  />
                </div>
              </div>
            </li>
          </ul>
        </main>
      </div>
      <section className={styles.formationContainer}>
        <h1>My Formations</h1>
        <div className={styles.gridContainer}>
          {user.role === "Teacher" && <AddCard />}
          {formations?.map((formation) => (
            <Card
              id={formation._id}
              name={formation.name}
              price={formation.price}
              hours={formation.hours}
              creator={formation.creator}
              image={formation.image}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Profile;
