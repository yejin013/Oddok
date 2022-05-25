import React from "react";
import { Plus, Person } from "@icons";
import styles from "./UserCount.module.css";

function UserCount({ number, isTotalUser, isBookmarkUser }) {
  const users = [];
  const displayType = isTotalUser || isBookmarkUser ? styles.big : styles.small;

  for (let i = 0; i < number; i += 1) {
    // 참여자 6명 이상일때 옆에 + 하나만 추가
    if (i > 4 && i <= 5) {
      users.push(
        <div className={`${styles.plus} ${displayType}`}>
          <Plus />
        </div>,
      );
    } else if (i <= 4) {
      users.push(
        <div className={displayType}>
          <Person />
        </div>,
      );
    }
  }

  return <div className={styles.count}>{users}</div>;
}

export default UserCount;
