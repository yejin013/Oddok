import React from "react";
import { Award, MicOn, MicOff } from "@icons";
import styles from "./UserTag.module.css";

function UserTag({ isHost, isMicOn, nickname }) {
  return (
    <div className={styles.box}>
      <div>{isHost && <Award />}</div>
      <div className={styles.icon}>{isMicOn ? <MicOn /> : <MicOff />}</div>
      <span>{nickname}</span>
    </div>
  );
}

export default UserTag;
