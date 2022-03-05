import React, { useRef, useEffect } from "react";

function UserVideo({ streamManager }) {
  const videoRef = useRef();
  const getNameTag = () => JSON.parse(streamManager.stream.connection.data).clientData;

  useEffect(() => {
    if (videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  });

  return (
    <div className="stream">
      <video autoPlay ref={videoRef} />
      <div>
        <p>{getNameTag()}</p>
      </div>
    </div>
  );
}

export default UserVideo;
