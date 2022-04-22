import React from "react";
import Thumbnail from "./thumbnail";
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";
import { ReactComponent as Unlock } from "../../../assets/icons/unlock.svg";
import { ReactComponent as BookMark } from "../../../assets/icons/bookmark.svg";

import styles from "./studyroom_card.module.css";
import UserCount from "./user_count";

function StudyRoomCard({ roomData }) {
  return (
    <li className={styles.container}>
      <div className={styles.thumbnail_box}>
        <Thumbnail />
        <div className={styles.bookmark_icon}>
          <BookMark />
        </div>
        <div className={styles.user_count}>
          <UserCount number={roomData.limitUsers} />
          <span>/ {roomData.limitUsers}</span>
        </div>
      </div>
      <div className={styles.content_box}>
        <div className={styles.content_head}>
          <div className={styles.title}>{roomData.name}</div>
          <div className={styles.lock_icon}>{roomData.isPublic ? <Unlock /> : <Lock />}</div>
        </div>
        <div>
          {roomData.hashtags.map((hashtag) => (
            <span>#{hashtag} </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export default StudyRoomCard;
