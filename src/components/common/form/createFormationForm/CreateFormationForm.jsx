import React, { useState } from "react";
import Input from "../../input/Input";
import Button from "../../button/Button";
import { IoClose } from "react-icons/io5";
import styles from "./styles.module.css"
import { useCreateFormation } from "../../../../API/formationApi";

const CreateFormationForm = () => {
  
  const [formation, setFormation] = useState("");
  const [categorie, setCategorie] = useState("");
  const [listCategorie, setListCategorie] = useState([]);
  const {newFormation,fetchData} = useCreateFormation({name: formation, categorie: listCategorie})
  console.log("post return", newFormation);
  const addCategory = () => {
    setListCategorie([...listCategorie, categorie]);
    setCategorie("");
  };

  const handleFormation = (e) => {
    setFormation(e.target.value);
  };
  const handleCategorie = (e) => {
    setCategorie(e.target.value);
  };
  const handleDelete = (categorie) => {
    setListCategorie(listCategorie.filter((cat) => cat !== categorie));
  };

  return (
    <div className="d-flex align-items-baseline flex-column">
      <Input
        type={"text"}
        id={"formation"}
        text={"Formation Name:"}
        value={formation}
        onChange={handleFormation}
      />
      <div className="d-flex justify-content-baseline flex-row">
        {listCategorie &&
          listCategorie.map((categorie) => (
            <span
              role="button"
              onClick={() => handleDelete(categorie)}
              className="p-1 m-1 bg-primary rounded-pill text-light d-flex align-items-center"
            >
              {categorie} <IoClose color="red" />
            </span>
          ))}
      </div>

      <div className="d-flex justify-content-center align-items-baseline position-relative">
        <Input
          type={"text"}
          id={"categorie"}
          text={"Categorie:"}
          value={categorie}
          onChange={handleCategorie}
        />
        {listCategorie.length < 5 &&
          (console.log(listCategorie.length, listCategorie.length < 6),
          (
            <div className={styles.absolute}>
              <Button text="Add" type="txtbtn" w="w50" onClick={addCategory} />
              
            </div>
          ))}
      </div>
      <div className="d-flex pt-4">
        <Button text="Annuler" type="bgw" w="w100" onClick={addCategory} />
        <Button text="Confirmer" type="bgb" w="w100" onClick={fetchData} />
      </div>
    </div>
  );
};

export default CreateFormationForm;
