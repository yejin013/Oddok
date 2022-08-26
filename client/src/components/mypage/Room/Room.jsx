import React from "react";
import { Thumbnail } from "@components/commons";
import styles from "./Room.module.css";

function Room({ roomData }) {
  return (
    <div className={styles.box}>
      <div className={styles.thumbnail_box}>
        <Thumbnail />
      </div>
      <div className={styles.info_box}>
        <p className={styles.title}>{roomData.name}</p>
        <p>
          {roomData.hashtags.map((hashtag) => (
            <span>#{hashtag} </span>
          ))}
        </p>
        <p>{roomData.endAt} 까지</p>
      </div>
    </div>
  );
}

export default Room;
