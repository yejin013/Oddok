import React, { useRef, useEffect } from "react";
import TotalTime from "../TotalTime/TotalTime";
import UserTag from "../UserTag/UserTag";
import styles from "./UserVideo.module.css";

function UserVideo({ count, publisher, subscriber }) {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef) {
      if (publisher) {
        publisher.streamManager.addVideoElement(videoRef.current);
      } else if (subscriber) {
        subscriber.streamManager.addVideoElement(videoRef.current);
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
      case 5:
      case 6:
        return styles.maxium;
      default:
        throw new Error("제한 인원을 넘었습니다");
    }
  };

  return (
    <li className={`${styles.video} ${getCount(count)}`}>
      <video className={styles.user_video} ref={videoRef} autoPlay />
      {publisher && <TotalTime />}
      <UserTag
        isHost={publisher ? publisher.isHost : subscriber.isHost}
        isMicOn={publisher ? publisher.isMicOn : subscriber.isMicOn}
        nickname={publisher ? publisher.nickname : subscriber.nickname}
      />
    </li>
  );
}

export default UserVideo;
