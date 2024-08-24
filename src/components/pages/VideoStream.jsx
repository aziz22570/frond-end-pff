import React, { useEffect, useRef } from 'react'

const VideoStream = ({myStream,ref}) => {
  console.log("myStream",myStream);
  const videoRef = useRef();

    if (myStream) {
      videoRef.current.srcObject = myStream;
    }


  return (
    <div>   {!myStream  && <div style={{ width: "400px", height: "400px",  backgroundColor: "#c7c7c7",  }} />}
      
            
      
            <video muted style={{ width: '400px', height: '400px' }} ref={ref} autoPlay playsInline controls={false} />
  
    </div>
  )
}

export default VideoStream