import React from "react";
import { Award, MicOn, MicOff } from "@icons";
import styles from "./ParticipantSideBar.module.css";

function ParticipantSideBar({ participants }) {
  return (
    <aside className={styles.side}>
      <ul>
        {participants.map((user) => (
          <li className={styles.item}>
            <div>
              {user.isHost && <Award />}
              <span>{user.nickname}</span>
            </div>
            <div className={user.isMicOn ? styles.on_icon : styles.off_icon}>
              {user.isMicOn ? <MicOn /> : <MicOff />}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ParticipantSideBar;
