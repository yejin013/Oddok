import React, { useState } from "react";
import StudyBar from "../../components/study/study_bar/study_bar";
import UserVideo from "../../components/study/user_video/user_video";
import styles from "./study_room.module.css";

function StudyRoom(props) {
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(0); // 인원 수

  /* openvidu 연결코드 */

  return (
    <div className={styles.room}>
      <div className={styles.video_container}>
        <ul className={styles.videos}>
          {publisher && <UserVideo count={count} streamManager={publisher} />}
          {subscribers && subscribers.map((subscriber) => <UserVideo count={count} streamManager={subscriber} />)}
        </ul>
      </div>
      <div className={styles.bar}>
        <StudyBar />
      </div>
    </div>
  );
}

export default StudyRoom;
