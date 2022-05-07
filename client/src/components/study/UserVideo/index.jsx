import React, { useRef, useEffect } from "react";
import TotalTime from "../TotalTime";
import styles from "./user_video.module.css";

function UserVideo({ count, publisher, subscriber }) {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef) {
      if (publisher) {
        publisher.addVideoElement(videoRef.current);
      } else if (subscriber) {
        subscriber.addVideoElement(videoRef.current);
      }
    }
  }, [publisher, subscriber]);

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
        return styles.multi;
    }
  };

  return (
    <li className={`${styles.video} ${getCount(count)}`}>
      <video className={styles.user_video} ref={videoRef} autoPlay />
      {publisher && <TotalTime />}
    </li>
  );
}

export default UserVideo;
