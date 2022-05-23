import React from "react";
import { Thumbnail } from "@components/commons";
import styles from "./MyRoom.module.css";

function MyRoom({ roomData }) {
  return (
    <div className={styles.box}>
      <div className={styles.thumbnail_box}>
        <Thumbnail />
      </div>
      <div className={styles.info_box}>
        <div className={styles.title}>{roomData.name}</div>
        <div>
          {roomData.hashtags.map((hashtag) => (
            <span>#{hashtag} </span>
          ))}
        </div>
        <div>{roomData.endAt} 까지</div>
      </div>
    </div>
  );
}

export default MyRoom;
