import React from "react";
import { Award, MicOn, MicOff } from "@icons";
import styles from "./ParticipantSideBar.module.css";

function ParticipantSideBar({ participants }) {
  return (
    <aside className={styles.side}>
      {participants.map((user) => (
        <div className={styles.item}>
          <div>
            {user.isHost && <Award />}
            <span>{user.nickname}</span>
          </div>
          <div className={user.isMicOn ? styles.on_icon : styles.off_icon}>{user.isMicOn ? <MicOn /> : <MicOff />}</div>
        </div>
      ))}
    </aside>
  );
}

export default ParticipantSideBar;
