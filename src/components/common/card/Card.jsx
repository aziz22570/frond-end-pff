import React from "react";
import styles from "./styles.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Card = ({ id, name, price, hours, creator, image }) => {
  const navigate = useNavigate();

  const HandleButton = (id) => {
    navigate(`/formation/${id}`);
  };
  return (
    <li className={styles.formationItem} key={id}>
      <img
        src={`http://localhost:5000/formationImg/${
          image ? image : "default.jpg"
        }`}
        alt=""
      />
      <h3 className={styles.name}>{name}</h3>
      <h3 className={styles.desc}>price: {price}</h3>
      <h3 className={styles.desc}>hours: {hours}</h3>
      <h3 className={styles.creator}>creator: {creator.username}</h3>
      <div className={styles.btn}>
        <Button
          text="Read More"
          type="bgw"
          w="w100"
          onClick={() => HandleButton(id)}
        />
      </div>
    </li>
  );
};

export default Card;
