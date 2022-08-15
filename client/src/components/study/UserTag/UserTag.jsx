import React from "react";
import { Award, MicOn, MicOff } from "@icons";
import styles from "./UserTag.module.css";

function UserTag({ isHost, audioActive, nickname }) {
  return (
    <div className={styles.box}>
      <div>{isHost && <Award />}</div>
      <div className={audioActive ? styles.on_icon : styles.off_icon}>{audioActive ? <MicOn /> : <MicOff />}</div>
      <span>{nickname}</span>
    </div>
  );
}

export default UserTag;
