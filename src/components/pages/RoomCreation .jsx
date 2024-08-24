import axiosInstance from '../../features/auth/axiosInstance';

const RoomCreation = ({ createRoom ,inputValue,handleInputValue,joinRoom}) => {

    const handleJoinRoom = async () => {
        try {
            const response = await axiosInstance.post('http://127.0.0.1:5000/api/v1/room');
            if (response.status === 200) {
              console.log(response.data);
              createRoom(response.data);
            }
        } catch (error) {
            console.error('Error joining room:', error);
        }
    };

    return (
        <div>
            <input
            type="text"
            value={inputValue}
            onChange={handleInputValue}
            placeholder="Enter Room ID"
          />
          <button onClick={() => joinRoom(inputValue)}>Join room</button>

            <button onClick={handleJoinRoom}>Create Room</button>
        </div>
    );
};

export default RoomCreation;
