import React, { useEffect, useState } from "react";
import {
  useFetchFormation,
  useUpdateFormation,
} from "../../../../API/formationApi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Programme from "./Programme";
import DataFormation from "./DataFormation";
import styles from "./styles.module.css";
import Button from "../../../common/button/Button";
import Input from "../../../common/input/Input";
import _ from "lodash";
import { useUpdateUser } from "../../../../API/User";

const EditFormation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const myFormations = useSelector((state) => state.user.user?.formation);
  const { formation, loading, error } = useFetchFormation(id);
  const [image, setImage] = useState(null);
  const { newFormation, fetchData } = useUpdateFormation(id);
  const [addProgramme, setAddProgramme] = useState(newFormation || []);
  const [programmeInput, setProgrammeInput] = useState("");
  const [show, setShow] = useState(true);
  const [buttonValue, setButtonValue] = useState("Update");

  console.log("addprogrames", addProgramme);

  useEffect(() => {
    if (formation && formation.programmes && !newFormation) {
      console.log("if running", _.cloneDeep(formation.programmes));
      setAddProgramme(_.cloneDeep(formation.programmes));
    }
    if (newFormation) {
      console.log("secondif running", _.cloneDeep(newFormation.programmes));
      setAddProgramme(_.cloneDeep(newFormation.programmes));
    }
  }, [formation, newFormation]);

  useEffect(() => {
    setButtonValue(show ? "Update" : "Save");
  }, [show]);

  const dataInput = [
    {
      type: "text",
      text: "Name",
      value: newFormation?.name ? newFormation.name : formation.name,
      key: "name",
    },
    {
      type: "text",
      text: "Categorie",
      value: newFormation?.categorie
        ? newFormation.categorie
        : formation.categorie,
      key: "categorie",
    },
    {
      type: "number",
      text: "Price",
      value: newFormation?.price ? newFormation.price : formation.price,
      key: "price",
    },

    {
      type: "number",
      text: "Hours",
      value: newFormation?.hours ? newFormation.hours : formation.hours,
      key: "hours",
    },
    {
      type: "date",
      text: "Date of starting",
      value: newFormation?.start ? newFormation.start : formation.start,
      key: "start",
    },
    
  ];

  if (!myFormations.includes(id)) {
    navigate("/");
  }

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setImage(formData);
  };

  const updateImageHandler = async () => {
    await fetchData(image, "image");
  };
  const addProgrammeHandler = () => {
    setAddProgramme(() => {
      console.log("3 if running", _.cloneDeep(formation.programmes));

      const updatedProgrammes = [
        ...addProgramme,
        { title: programmeInput, soustitles: [] },
      ];

      return updatedProgrammes;
    });
    setProgrammeInput("");
  };

  const handleProgrammeInput = (e) => {
    setProgrammeInput(e.target.value);
  };
  const cancleUpdateBtn = async () => {
    setShow(!show);
    console.log(newFormation.programmes);

    newFormation
      ? setAddProgramme(newFormation.programmes)
      : setAddProgramme(formation.programmes);
  };
  const handleUpdateBtn = async () => {
    if (buttonValue === "Save") {
      await fetchData({ programmes: addProgramme });
    } else {
    }
    setShow(!show);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.dataFormation}>
            <DataFormation dataInput={dataInput} fetchData={fetchData} userState={formation?.userState}/>
          </div>
          <div className={styles.programme}>
            <h3>Programme: </h3>

            {addProgramme?.map((programme) => (
              <Programme
                title={programme.title}
                soustitles={programme.soustitles}
                id={programme._id}
                setAddProgramme={setAddProgramme}
                addProgramme={addProgramme}
                show={show}
                cansel={show}
                canselProgramme={
                  newFormation ? newFormation.programmes : formation.programmes
                }
              />
            ))}
            {!show && (
              <div className="d-flex align-items-baseline">
                {
                  <Input
                    type="text"
                    placeholder={"ajouter un title"}
                    disabled={show}
                    translate={{ width: "400px", height: "40px" }}
                    value={programmeInput}
                    onChange={handleProgrammeInput}
                  />
                }
                <div className={styles.btnContainer}>
                  <Button
                    text={"Add"}
                    type="txtbtn"
                    w="w100"
                    onClick={addProgrammeHandler}
                  />
                </div>
              </div>
            )}
            <div className={styles.btnContainer}>
              {!show && (
                <Button
                  text="cancel"
                  type="bgw"
                  w="w100"
                  onClick={cancleUpdateBtn}
                />
              )}
              <Button
                text={buttonValue}
                type="bgb"
                w="w100"
                onClick={handleUpdateBtn}
              />
            </div>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.image}>
            <img
              src={
                formation?.image || newFormation?.image
                  ? `http://localhost:5000/formationImg/${
                      newFormation ? newFormation.image : formation.image
                    }`
                  : `http://localhost:5000/formationImg/default.jpg`
              }
              alt={`${formation.name}`}
            />
            <input type="file" onChange={imageHandler} />
            <button onClick={updateImageHandler}>valider</button>
          </div>

          <div className={styles.participants}>
            {formation.participants ? (
              <h3>participants : {formation.participants.length}</h3>
            ) : (
              <h1>participants: 0</h1>
            )}
            {formation.participants?.map((participant) => (
              <div className={styles.userContainer}>
                <img
                  className={styles.imageUser}
                  src={
                    
                    `http://localhost:5000/usersImages/${
                      participant?.image ? participant.image : "default.jpg"
                    }`
                  }
                  alt={`${participant.name}`}
                />

                <p>{participant.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFormation;
