import React, { useRef, useEffect } from "react";
import TotalTime from "../TotalTime/TotalTime";
import UserTag from "../UserTag/UserTag";
import styles from "./UserVideo.module.css";

function UserVideo({ count, user }) {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef) {
      user.stream?.addVideoElement(videoRef.current);
    }
  }, [user.stream]);

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
    <li className={`${styles.wrapper} ${getCount(count)}`}>
      <video className={styles.video} ref={user.streamRef || videoRef} autoPlay />
      {!user.connectionId && <TotalTime />}
      <UserTag isHost={user.isHost} isMicOn={user.isMicOn} nickname={user.nickname} />
    </li>
  );
}

export default UserVideo;
