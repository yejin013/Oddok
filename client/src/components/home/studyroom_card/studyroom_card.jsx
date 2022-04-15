import React from "react";
import Thumbnail from "./thumbnail";
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";
import { ReactComponent as Unlock } from "../../../assets/icons/unlock.svg";

import styles from "./studyroom_card.module.css";
import UserCount from "./user_count";

function StudyRoomCard({ roomData }) {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnail_box}>
        <Thumbnail />
        <div className={styles.lock_icon}>{roomData.isPublic ? <Unlock /> : <Lock />}</div>
        <div className={styles.user_count}>
          <UserCount number={roomData.limitUsers} />
        </div>
      </div>
      <div className={styles.content_box}>
        <span className={styles.title}>{roomData.name}</span>
        <div>
          {roomData.hashtags.map((hashtag) => (
            <span>#{hashtag} </span>
          ))}
        </div>
        <span>
          {roomData.currentUsers}/{roomData.limitUsers}
        </span>
      </div>
    </div>
  );
}

export default StudyRoomCard;
