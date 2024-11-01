import { useSelector } from "react-redux";
import axiosInstance from "../../../features/auth/axiosInstance";
import Button from "../../common/button/Button";
import { useFetchFormation } from "../../../API/formationApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ThreeCircles } from 'react-loader-spinner'

const RoomCreation = ({ createRoom, joinRoom, roomId, handleInputValue ,disabled}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  if(!id){navigate("/")}

  const isFormer = useSelector((state)=>state.user.Teacher);
const isStudent = useSelector((state)=>state.user.Student);
const { formation, loading, error } = useFetchFormation(id);


useEffect(() =>{
  console.log("formation.meet",formation.meet);
  handleInputValue(formation.meet)
},[formation])
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
    </div>)
}

if (error) {
  return <div>{error}</div>;
}
  return (
    <>

      {isStudent &&(formation.meet ?   <Button text={"Join Room"} type={"bgw"} w="w200" onClick={joinRoom} disabled={disabled}/> : <h3>No Room For Now</h3>)}
      {isFormer && (
        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
          <p className="m-auto mb-3 fs-4 text-center">Engage in Interactive Online Learning for Everyone</p>

          <Button text={"Create Room"} type={"bgw"} w="w200" onClick={createRoom}  />

          <p className="fs-6 text-secondary ">Celebrate educational moments from anywhere with our platform.</p>
        </div>
        
        )}
    </>
  );
};

export default RoomCreation;
