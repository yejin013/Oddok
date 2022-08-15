import React from "react";
import { Plus, Person } from "@icons";
import styles from "./UserCount.module.css";

function UserCount({ number }) {
  const users = [];
  for (let i = 0; i < number; i += 1) {
    if (i > 5) {
      break;
    }
    if (i <= 4) {
      users.push(
        <div className={styles.person}>
          <Person />
        </div>,
      );
      // 스터디원 6명 이상일때 옆에 + 하나만 추가
    } else if (i > 4 && i <= 5) {
      users.push(
        <div className={styles.plus}>
          <Plus />
        </div>,
      );
    }
  }

  return <div className={styles.count}>{users}</div>;
}

export default UserCount;
