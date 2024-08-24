import React, { useEffect, useState } from "react";
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
import { useFetchUser, useUpdateUser } from "../../../API/User";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "react-rating";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { getRating, rateFormer } from "../../../API/rating";


const Visitor = () => {
  const {id} = useParams();
  const {user,loading,error} = useFetchUser(id)
  const navigate = useNavigate()
  const visitor =  useSelector((state) => state.user.user);
  const isVisitor = user?._id !==  visitor._id
  const isTeacher =  useSelector((state) => state.user.Teacher);
  const [rating, setRating] = useState(0);
  const [raterRating, setRaterRating] = useState(0);
  const [raters, setRaters] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [err, setErr] = useState(null);
  

  console.log(visitor);


  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await getRating({ teacher: id, rater: visitor._id });
        if (response && response.data) {
          setRating(response.data.rating);
          setRaterRating(response.data.raterRating);
          setRaters(response.data.raters);
          setHasRated(response.data.hasRated);
        }
      } catch (err) {
        setErr('Failed to fetch rating');
        console.error(err);
      }
    };

    fetchRating();
  }, [id, visitor]);










  if(!isVisitor) {
    navigate('/profile')
  }
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
  const { formations } = useMyFormation(id);
  const [image, setImage] = useState(null);

  const [rows, setRows] = useState(
    textarea.length > 320 ? Math.ceil(textarea.length / 80) : 4
  );


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
  const imageHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setImage(formData);
  };
  const updateImageHandler = async () => {
    await updateData(image, "image");
  };
  const handleRating =async (value)=>{
  
    try {
      const response = await  rateFormer({rater: visitor._id, rating: value,former:id})
console.log(response);

      if (response && response.data) {
        setRating(response.data.rating);
        setRaters(response.data.raters);
        setRaterRating(value)
      }
    } catch (err) {
      setErr('Failed to fetch rating');
      console.error(err);
    }
  }
  
  if(loading){
    return <div>Loading...</div>
  }
  else if (!user){
    return <div>404 user not found</div>
  }

  return (
  
    <>

          {openContactInformationForm && (
        <Modal onClick={handleContactInformation}>
          <ContactFormationForm email={user?.email} number={user?.number} isVisitor/>
        </Modal>
      )}
      <div className={styles.container}>
        <aside>
          <h5 className={styles.title}>Personal details</h5>
          <div className={styles.imgContainer}>
            <img
              src={
                user?.image
                  ? `http://localhost:5000/usersImages/${user?.image}`
                  : `http://localhost:5000/usersImages/default.jpg`
              }
              alt={`${user?.name}`}
            />
          </div>
          <h4>{user?.username}</h4>
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
        {!isTeacher &&  <li className={styles.ratingBox}>
              <span>My Raiting:</span>
              <div className={styles.rating}>

              <Rating
                
                initialRating={raterRating || 0}
                  emptySymbol={<IoStarOutline size={30} className={styles.emptyRating}/>}
                  fullSymbol={<IoStarSharp size={30} className={styles.fullRating} />}
                  fractions={2}
                  onClick={(value) => {
                  handleRating(value);
                  }}
                />
              </div>

            </li>}
            <li
              onClick={handleContactInformation}
              className={styles.slotContainer}
            >
              <h6>Contact information</h6>
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
        <h1>{user?.username} Formations</h1>
        <div className={styles.gridContainer}>
          {formations?.map((formation) => (
            <Card
              id={formation._id}
              name={formation.name}
              price={formation.price}
              hours={formation.hours}
              creator={formation.creator}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Visitor;
