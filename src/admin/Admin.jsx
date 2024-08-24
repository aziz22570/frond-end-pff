import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import Sidebar from "./sidebar/Sidebar";
import Statistiques from "./main/Statistiques";
import FormerList from "./main/FormerList";
import FormationList from "./main/FormationList";
import StudentList from "./main/StudentList";

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState("Statistiques");
  const handleActiveComponent = () => {
    switch (activeComponent) {
      case "Statistiques":
        return <Statistiques/>;
      case "FormerList":
        return <FormerList/>;
      case "StudentList":
        return <StudentList/>;

      case "FormationList":
        return <FormationList/>;


      default:
        return <Statistiques/>;
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar
        className={styles.sidebar}
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <div className={styles.main}>{handleActiveComponent()}</div>
    </div>
  );
};

export default Admin;
