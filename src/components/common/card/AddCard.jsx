import React, { useCallback } from "react";
import styles from "./styles.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { handleCreateFormationForm } from "../../../store/popupSlice";
import { useDispatch } from "react-redux";
import CreateFormationForm from "../form/createFormationForm/CreateFormationForm";
import Modal from "../modal/Modal";

const AddCard = () => {
  const dispatch = useDispatch();

  const createFormationForm = useSelector((state) => state.form.createFormation);

  const handleCreateFormation = useCallback(() => {
    dispatch(handleCreateFormationForm());
  }, [dispatch]);

  return (
    <>
    {createFormationForm && (
        <Modal onClick={handleCreateFormation}>
          <CreateFormationForm />
        </Modal>
      )}
    <li onClick={handleCreateFormation}  className={ `${styles.formationItem} ${styles.plusContainer}` } >
      <FaPlus />
      


    </li></>
  );
};

export default AddCard;
