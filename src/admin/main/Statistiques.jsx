import React from "react";
import StudentFormerDiagrame from "./statistiquesDiagrames/StudentFormerDiagrame";
import StudentFormerFormationGraph from "./statistiquesDiagrames/StudentFormerFormationGraph";
import TimeGraphe from "./statistiquesDiagrames/TimeGraphe";
import useFetchFormer from "../../API/Teacher";
import { lastMonthStat, useFetchStudent } from "../../API/student";
import { useFetchFormation } from "../../API/certif";
import styles from "./styles.module.css";

const Statistiques = () => {
  const { Teacher, countFormer, loadingFormer, errorFormer } = useFetchFormer();
  const { student, studentCount, loadingStudent, errorStudent } =
    useFetchStudent();
  const { data, count, loading, error } = useFetchFormation();

  const studentArray = lastMonthStat(student);
  const formerArray = lastMonthStat(Teacher);
  const formationArray = lastMonthStat(data);

  const lastFiveMonthArray = [];
  for (let i = 0; i < studentArray.length; i++) {
    lastFiveMonthArray.push({
      month: studentArray[i].month,
      Student: studentArray[i].count,
      Teacher: formerArray[i].count,
      Formation: formationArray[i].count,
    });
  }
  console.log("lastFiveMonthArray", lastFiveMonthArray);

  return (
    <div className={styles.statistiquesContainer}>
      <section>
        <div className={styles.title}>
          <h1>Formers & Students statistics</h1>
        </div>
        <div className={styles.content}>
        <div style={{marginRight: "100px"}}>
          <h4 className="mb-3 ">statistics:</h4>
          <p className={styles.ml2}>Number Of Teacher: {countFormer}</p>
          <p className={styles.ml2}>Number Of Student: {studentCount}</p>
          <p className={styles.ml2}>Moyen Of {studentCount/countFormer} Student For Every Teacher</p>

        </div>
        <div className={styles.colorContainer}>
          <div className={styles.color}>
            <span className={styles.blueColor}></span>
            <h6>Teacher</h6>


          </div>
          <div className={styles.color}>
          <span className={styles.greenColor}></span>
          <h6>Student</h6>

          </div>
        </div>
        <div style={{ width: "400px", height: "350px",marginLeft: "35px" }}>
          {
            <StudentFormerDiagrame
              countFormer={countFormer}
              studentCount={studentCount}
            />
          }
        </div>
        </div>

      </section>



      <section>
          <div className={`${styles.title} mb-3`}>
          <h1> Couses statistics</h1>
        </div>
        <div className={styles.content}>


        <div style={{ width: "500px", height: "300px" }}>
          {
            <StudentFormerFormationGraph
              countFormer={countFormer}
              studentCount={studentCount}
              count={count}
            />
          }
        </div>
        <div>
          <h4 className="mb-3 ">statistics:</h4>
          <p className={styles.ml2}>Number Of Formation: {count}</p>
          <p className={styles.ml2}>{count/countFormer} formation created by every Teacher</p>
        </div>
        </div>
      </section>
      <section>
      <div className={`${styles.title} mb-3`}>
          <h1> Monthly statistics</h1>
        </div>
        <div className={styles.content}>
        <div>
          <h4 className="mb-3 ">statistics:</h4>
          <p className={styles.ml2}>Number Of Teacher: {countFormer}</p>
          <p className={styles.ml2}>Number Of Student: {studentCount}</p>
          <p className={styles.ml2}>Moyen Of {studentCount/countFormer} Student For Every Teacher</p>

        </div>
        <div style={{ width: "500px", height: "400px" }}>
          {<TimeGraphe lastFiveMonthArray={lastFiveMonthArray} />}
        </div>
        </div>
      </section>

    </div>
  );
};

export default Statistiques;
