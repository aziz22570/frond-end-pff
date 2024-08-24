import { useSelector } from "react-redux";
import axiosInstance from "../../../features/auth/axiosInstance";
import Button from "../../common/button/Button";
import { useFetchFormation } from "../../../API/formationApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const RoomCreation = ({ createRoom, joinRoom, roomId, handleInputValue }) => {
  const { id } = useParams();

  const isFormer = useSelector((state)=>state.user.Teacher);
const isStudent = useSelector((state)=>state.user.Student);
const { formation, loading, error } = useFetchFormation(id);

useEffect(() =>{
  console.log("formation.meet",formation.meet);
  handleInputValue(formation.meet)
},[formation])
if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}
  return (
    <>

      {isStudent &&(formation.meet ? <button onClick={joinRoom}>Join Room</button> : <h3>No Room For Now</h3>)}
      {isFormer && (
        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
          <p className="m-auto mb-3 fs-4 text-center">Engage in Interactive Online Learning for Everyone</p>

          <Button text={"Create Room"} type={"bgw"} w="w200" onClick={createRoom} />

          <p className="fs-6 text-secondary ">Celebrate educational moments from anywhere with our platform.</p>
        </div>
        
        )}
    </>
  );
};

export default RoomCreation;
