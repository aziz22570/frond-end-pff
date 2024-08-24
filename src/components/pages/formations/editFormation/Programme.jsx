import React, { memo, useEffect, useState } from "react";
import Input from "../../../common/input/Input";
import Button from "../../../common/button/Button";
import styles from "./styles.module.css";
import { MdDeleteSweep } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Soustitle from "./Soustitle";

const Programme = ({
  title,
  soustitles,
  id,
  setAddProgramme,
  addProgramme,
  show,
  cansel,
  canselProgramme,
}) => {


  const [flech, setFlech] = useState("down");
  const [sousProgrammeInput, setSousProgrammeInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (cansel) {
      setDisabled(true);
      setAddProgramme(canselProgramme);
    }
  }, [cansel]);
  const handleProgramme = () => {
    flech === "down" ? setFlech("up") : setFlech("down");
  };
  const handleSousProgrammeInput = (e) => {
    setSousProgrammeInput(e.target.value);
  };

  const addSousProgrameHandler = (id, sousProgrammeInput) => {
    setAddProgramme(
      addProgramme.map((programme) => {
        if (programme._id === id) {
          return {
            title: programme.title,
            soustitles: [...programme.soustitles, sousProgrammeInput],
          };
        }
        return programme;
      })
    );
    setSousProgrammeInput("");
  };
  const handleDeleteButton = () => {};
  const handleUpdateButton = () => {
    setDisabled(!disabled);
    setFlech("up");
  };
  const handleUpdateTitle = (e) => {
    setAddProgramme(
      addProgramme.map((programme) => {
        if (programme._id === id) {
          return {
            title: e.target.value,
            soustitles: programme.soustitles,
          };
        }
        return programme;
      })
    );
  };

  return (
    <div>
      <div className={"d-flex align-items-center justify-content-evenly"}>
        <Input
          type="text"
          value={title}
          disabled={disabled}
          flech={flech}
          onClick={handleProgramme}
          translate={{ width: "400px", height: "50px" }}
          updateBtn={!show}
          delBtn={!show}
          onChange={handleUpdateTitle}
        />

        {!show && (
          <>
            <div onClick={handleUpdateButton} className={styles.updateButton}>
              <FaPen />
            </div>
            <div onClick={handleDeleteButton} className={styles.deleteButton}>
              <MdDeleteSweep />
            </div>
          </>
        )}
      </div>

      {soustitles?.map(
        (soustitle, index) =>
          flech === "up" && (
            <Soustitle
              soustitle={soustitle}
              index={index}
              disabled={disabled}
              handleProgramme={handleProgramme}
              setAddProgramme={setAddProgramme}
              addProgramme={addProgramme}
              id={id}
              cansel={cansel}
              canselProgramme={canselProgramme}
            />
          )
      )}
      {flech === "up" && !disabled && (
        <div className="d-flex align-items-baseline">
          {
            <Input
              type="text"
              placeholder={"ajouter un title"}
              disabled={show}
              translate={{
                marginLeft: "25%",
                width: "350px",
                height: "45px",
              }}
              value={sousProgrammeInput}
              onChange={handleSousProgrammeInput}
            />
          }
          <div className={styles.btnContainer}>
            <Button
              text={"Add"}
              type="txtbtn"
              w="w100"
              onClick={() => addSousProgrameHandler(id, sousProgrammeInput)}
            />
          </div>
        </div>
      )}

      <div></div>
    </div>
  );
};

export default memo(Programme);
