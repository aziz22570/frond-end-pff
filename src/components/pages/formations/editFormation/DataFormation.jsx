import React, { useEffect, useState } from "react";
import Input from "../../../common/input/Input";
import styles from "./styles.module.css";
import Button from "../../../common/button/Button";
import { IoClose } from "react-icons/io5";

const DataFormation = ({ dataInput, fetchData, userState }) => {
  const [data, setData] = useState(dataInput);
  const [initialData, setInitialData] = useState(dataInput);
  const [show, setShow] = useState(true);
  const [buttonValue, setButtonValue] = useState("Update");
  const [categorie, setCategorie] = useState("");
  const [state,setState] = useState(userState)
  console.log(userState);

  useEffect(() => {
    setData(dataInput);
    setInitialData(dataInput);
  }, [dataInput]);

  const handleInputChange = (key) => (e) => {
    const { value } = e.target;
    setData((prevData) =>
      prevData.map((item) => (item.key === key ? { ...item, value } : item))
    );
  };

  const handleUpdateBtn = () => {
    if (buttonValue === "Save") {
      const changedData = data.reduce((acc, { key, value }) => {
        const initialValue = initialData.find(
          (item) => item.key === key
        )?.value;
        if (value !== initialValue) {
          acc[key] = value;
        }
        return acc;
      }, {});
      console.log("the changed data", changedData);
      fetchData(changedData);
    }
    setShow(!show);
  };
  const cancleUpdateBtn = () => {
    setShow(!show);
    setData(dataInput);
  };

  useEffect(() => {
    setButtonValue(show ? "Update" : "Save");
  }, [show]);
  const addCategory = () => {
    if (categorie) {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === "categorie"
            ? { ...item, value: [...item.value, categorie] }
            : item
        )
      );
      setCategorie("");
    }
  };
  const handleDelete = (value) => {
    if (buttonValue === "Save") {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === "categorie"
            ? { ...item, value: item.value.filter((cat) => cat !== value) }
            : item
        )
      );
    }
  };
  const handleCategorie = (e) => {
    setCategorie(e.target.value);
  };
  return (
    <div>
      <h3>Training Details:</h3>
      {data?.map((data, index) => (
        <div key={index}>
          {data.text !== "Categorie" ? (
            <Input
              type={data.type}
              text={data.text}
              id={data.text}
              value={data.value}
              onChange={handleInputChange(data.key)}
              disabled={show}
              translate={{ width: "280px" }}
            />
          ) : (
            <>
              <p>{data.text}</p>
              <div className="d-flex justify-content-baseline flex-row">
                {data.value?.map((value, index) => (
                  <span
                    key={index}
                    role="button"
                    onClick={() => handleDelete(value)}
                    className="pt-1 pb-1 ps-2 pe-2 m-1 me-2 bg-primary rounded-pill text-light d-flex align-items-center"
                  >
                    {value} {buttonValue === "Save" && <IoClose color="red" />}
                  </span>
                ))}
              </div>

              {!show && (
                <div className="d-flex align-items-baseline position-relative">
                  <Input
                    translate={{ width: "140px" }}
                    type={data.type}
                    id={data.text}
                    value={categorie}
                    onChange={handleCategorie}
                  />
                  {data.value?.length < 5 && !show && (
                    <div className={styles.absolute}>
                      <Button
                        text="Add"
                        type="bgb"
                        w="w50"
                        onClick={addCategory}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ))}

      <div>
        <h5>show the training to students :</h5>
        <div className="d-flex" >
      
        <input id="yes" type="radio" name="userState" checked={state === true} onClick={()=>{setState(true);fetchData({userState: true});}}/>
        <label htmlFor="yes">Yes</label>
        <input  style={{marginLeft: "30px"}} id="no" type="radio" name="userState" checked={state === false} onClick={()=>{setState(false);fetchData({userState: false});}}/>
        <label htmlFor="no">No</label>
        
        </div>

      </div>
      <div className={styles.btnContainer}>
        {!show && (
          <Button text="cancel" type="bgw" w="w100" onClick={cancleUpdateBtn} />
        )}
        <Button
          text={buttonValue}
          type="bgb"
          w="w100"
          onClick={handleUpdateBtn}
        />
      </div>
    </div>
  );
};

export default DataFormation;
