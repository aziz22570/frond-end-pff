import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchFormation,
  useJoinFormation,
  usePayFormation,
} from "../../../API/formationApi";
import styles from "./styles.module.css";
import { IoLogoUsd } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import Button from "../../common/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginForm } from "../../../store/popupSlice";
import { BsCalendar2Date } from "react-icons/bs";
import { useEffect, useState } from "react";
import ShowProgramme from "./ShowProgramme";
import { ThreeCircles } from "react-loader-spinner";

const ShowFormation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { formation, loading, error } = useFetchFormation(id);
  const { fetchData } = useJoinFormation(id);
  const { fetchPayData } = usePayFormation(id);
  const isLoggedIn = useSelector((state) => state?.user.isLoggedIn);
  const isFormer = useSelector((state) => state?.user.Teacher);
  const userId = useSelector((state) => state?.user?.user?._id);
  const myFormations = useSelector((state) => state?.user.user?.formation);

  const dispatch = useDispatch();
  const [joined, setJoined] = useState(false);
  useEffect(() => {
    if (myFormations?.includes(id)) {
      setJoined(true);
    }
  }, [joined, id, myFormations]);
  const handleJoin = () => {
    if (isLoggedIn) {
      if (
        formation?.price === "free" ||
        !formation?.price ||
        formation?.price === "0"
      ) {
        fetchData(id);
      } else {
        fetchPayData({ trainingId: id, userId, trainingName: formation?.name ,walletId: formation?.walletId,amount: formation.price});
      }
    } else dispatch(handleLoginForm());
  };
  const handleOpen = () => {
    navigate(`/formation/${id}/${formation.name}`);
  };
  const handleEdit = () => {
    navigate(`/formation/edit/${id}`);
  };
  if (loading) {
    return (<div className="d-flex justify-content-center align-items-center" style={{
      width: "100%",
      height: "100%"
    }}>
      <ThreeCircles
    visible={true}
    height="100"
    width="100"
    color="#rgb(0, 171, 228)"
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />;
      </div>);
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!formation) {
    return <div>no foormation </div>;
  }
  console.log("the formation is", formation);
  return formation ? (
    <>
      <div className={styles.container}>
        <div className={styles.formation}>
          <div className={styles.infoContainer}>
            <h2 className={styles.name}>{formation.name}</h2>

            <h5 className={styles.desc}>{formation.description}</h5>
            <hr />
            <ul className={styles.logo}>
              <li>
                <IoLogoUsd />
                {formation.price}
              </li>
              <li>
                <MdAccessTimeFilled />
                {formation.hours}
              </li>
              <li>
                <a
                  onClick={() => {
                    console.log(formation.creator);
                  }}
                  href={`http://localhost:3000/profile/${formation?.creator?._id}`}
                >
                  <GiTeacher />
                  {formation?.creator?.username}
                </a>
              </li>
              <li>
                <BsCalendar2Date />
                {formation.start}
              </li>
            </ul>
          </div>

          <div className={styles.imgContainer}>
            <img src="/test.jpeg" alt="" />
          </div>
        </div>

        {!isFormer || joined ? (
          <div className={` d-flex mt-4 mb-3`}>
            {isFormer && joined && (
              <Button
                text={"Edit"}
                type="bgb"
                w="w200"
                onClick={() => {
                  handleEdit();
                }}
              />
            )}
            <Button
              text={joined ? "Open" : "Join Now"}
              type="bgw"
              w="w200"
              onClick={() => {
                if (joined) {
                  handleOpen();
                } else {
                  handleJoin();
                }
              }}
            />
          </div>
        ) : (
          <h3 className={styles.red}>Teacher can't join formation</h3>
        )}
      </div>

      <div className={styles.container} style={{paddingBottom: 0}}>
        <h2 className={styles.name}>What you'll learn</h2>
        <div className={styles.progImageConatainer}>
          <ul className={styles.programme}>
            {formation?.programmes?.map((programme) => {
              return (
                <ShowProgramme
                  id={programme._id}
                  tile={programme.title}
                  soustitles={programme.soustitles}
                />
              );
            })}
          </ul>
          <div className={styles.imgProgContainer} >
            <img src="/programme.png" alt="teacher" id="sticky-element"/>  
          </div>
        

        </div>
      </div>
    </>
  ) : (
    <div className={styles.container}>
      <h1>404 Not Found</h1>
    </div>
  );
};

export default ShowFormation;
