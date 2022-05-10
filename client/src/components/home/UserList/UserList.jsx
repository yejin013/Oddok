import React from "react";
import styles from "./UserList.module.css";

function UserList({ participant }) {
  return (
    <li className={styles.list}>
      {participant.isActive ? (
        <div className={styles.box}>
          <span className={styles.current_user}>{participant.nickname}</span>
          <span className={styles.current_time}>{`${participant.joinTime} ~ 지금까지`}</span>
        </div>
      ) : (
        <div className={styles.box}>
          <span className={styles.user}>{participant.nickname}</span>
          <span className={styles.time}>{participant.joinTime}</span>
        </div>
      )}
    </li>
  );
}

export default UserList;
