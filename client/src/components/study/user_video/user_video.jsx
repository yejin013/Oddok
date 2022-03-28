import React, { useRef, useEffect } from "react";
import TimeRecord from "../time_record/time_record";
import styles from "./user_video.module.css";

function UserVideo({ count, streamManager, hour, minute, second }) {
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
      <TimeRecord hour={hour} minute={minute} second={second} />
    </li>
  );
}

export default UserVideo;
