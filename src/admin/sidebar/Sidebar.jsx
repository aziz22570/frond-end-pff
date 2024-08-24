import React, { useCallback, useState } from "react";
import styles from "./styles.module.css";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { TfiStatsUp } from "react-icons/tfi";
import { PiCertificateFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RxPinLeft,RxPinRight } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { loginFailure } from "../../store/authSlice";




const Sidebar = ({ className,setActiveComponent,activeComponent }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleActiveComponent = (value) => {
    setActiveComponent(value)
  };
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(loginFailure());
  }, [dispatch]);
  
  return (
    <div className={open ? className : styles.closed}>
      <div className={styles.flechContainer}>
        <div onClick={handleOpen}>{open ? <RxPinLeft size={30} /> : <RxPinRight size={30} />}</div>
          
      </div>
      {open && <h3 className={styles.title} >Teach <span>Online</span></h3>
    }

      <div className={styles.menu}>
        <div onClick={()=>handleActiveComponent("Statistiques")}  className={`${styles.itemBox} ${activeComponent === "Statistiques" && styles.active}`}>
          <div className={styles.icon}>
            <TfiStatsUp size={open ? 20 : 25}  />
          </div>
          {open && <div className={styles.label}>Statistiques    <span><FaChevronRight/></span></div>}
        </div>
        <div onClick={()=>handleActiveComponent('FormerList')}  className={`${styles.itemBox} ${activeComponent === "FormerList" && styles.active}`}>
          <div className={styles.icon}>
            <FaChalkboardTeacher size={open ? 20 : 25}  />
          </div>
          {open && <div className={styles.label}>Teacher List <span><FaChevronRight/></span></div>}
        </div>
        <div  onClick={()=>handleActiveComponent('StudentList')} className={`${styles.itemBox} ${activeComponent === "StudentList" && styles.active}`}>
          <div className={styles.icon}>
            <GiTeacher  size={open ? 20 : 25} />
          </div>
          {open && <div className={styles.label}>Student List <span><FaChevronRight/></span></div>}
        </div>
        <div onClick={()=>handleActiveComponent('FormationList')}  className={`${styles.itemBox} ${activeComponent === "FormationList" && styles.active}`}>
          <div className={styles.icon}>
            <PiCertificateFill size={open ? 20 : 25}  />
          </div>
          {open && <div className={styles.label}>Formation List <span><FaChevronRight/></span></div>}
        </div>
      </div>

      <div className={styles.btnContainer}>
        <button onClick={handleLogout}><TbLogout2 size={open ? 20 : 15}/>{open && "Log Out"}</button>
      </div>
    </div>
  );
};

export default Sidebar;
