import React, { useRef, useEffect } from "react";
import styles from "./user_video.module.css";

function UserVideo({ count, streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  const getCount = (number) => {
    switch (number) {
      case 1:
        return styles.one;
      case 2:
        return styles.two;
      case 3:
      case 4:
        return styles.multi;
      default:
        throw new Error(`unknown: ${number}`);
    }
  };

  return (
    <li className={`${styles.video} ${getCount(count)}`}>
      <video className={styles.user_video} ref={videoRef} autoPlay />
    </li>
  );
}

export default UserVideo;