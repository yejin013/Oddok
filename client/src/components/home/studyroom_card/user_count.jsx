import React from "react";
import { ReactComponent as Person } from "../../../assets/icons/person-fill.svg";

import styles from "./user_count.module.css";

function UserCount({ number }) {
  const users = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < number; i++) {
    users.push(
      <div className={styles.user}>
        <Person />
      </div>,
    );
  }

  return <div className={styles.count}>{users}</div>;
}

export default UserCount;
