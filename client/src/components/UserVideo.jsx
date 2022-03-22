import React, { useRef, useEffect } from "react";

function UserVideo({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  });

  return (
    <div className="stream">
      <video autoPlay ref={videoRef} />
    </div>
  );
}

export default UserVideo;
