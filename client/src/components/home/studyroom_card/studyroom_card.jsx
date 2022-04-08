import React from "react";
import Thumbnail from "./thumbnail";
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";

import styles from "./studyroom_card.module.css";
import PeopleCount from "./people_count";

function StudyRoomCard() {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnail_box}>
        <Thumbnail />
        <div className={styles.lock_icon}>
          <Lock />
        </div>
        <div className={styles.people_icon}>
          <PeopleCount number={4} />
        </div>
      </div>
      <div className={styles.content_box}>
        <span className={styles.title}>공시생 1호실</span>
        <span>#해시태그1개 #해시태그2개</span>
        <span>4/4</span>
      </div>
    </div>
  );
}

export default StudyRoomCard;
