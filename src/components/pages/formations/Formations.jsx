import { useState } from "react";
import styles from "./styles.module.css";
import {
  useLastFormation,
  useListFormation,
  usePersoFormation,
} from "../../../API/formationApi";
import Pagination from "../../common/pagination/Pagination";
import { useSelector } from "react-redux";
import Search from "../../common/search/Search";
import Card from "../../common/card/Card";
import Section from "../../layout/section/Section";

const Formations = () => {
  console.log("render from formations");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePerso, setCurrentPagePerso] = useState(1);
  const { formations, totalpage } = useListFormation(currentPage);
  const { lastFormations } = useLastFormation();
  const { formationsPerso, totalpagePerso } =
    usePersoFormation(currentPagePerso);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  console.log("currentPage", currentPage);
  console.log("currentPagePerso", currentPagePerso);
  console.log("formations", formations);
  console.log("totalpage", totalpage);
  console.log("lastFormations", lastFormations);
  console.log("formationsPerso", formationsPerso);

  // useEffect(() => {setFormations(listFormation())},[])
  return (
    <>
      <Search />
    { formations && <Section
      title="ALL Certificates:"
        formations={formations}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalpage={totalpage}
      />}
      {lastFormations && <Section formations={lastFormations} title="New Certificates"/>}
      {isLoggedIn && formationsPerso && totalpagePerso !== 0 &&(
        <Section
        title="Certificates Personalisers"
          formations={formationsPerso}
          currentPage={currentPagePerso}
          setCurrentPage={setCurrentPagePerso}
          totalpage={totalpagePerso}
        />
      )}
    </>
  );
};

export default Formations;
