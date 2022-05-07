import React from "react";
import { Person } from "@icons";
import styles from "./styles.module.css";

function UserCount({ number, isBookmarkUser }) {
  const users = [];

  for (let i = 0; i < number; i += 1) {
    users.push(
      <div className={isBookmarkUser ? styles.bookmark_user : styles.user}>
        <Person />
      </div>,
    );
  }

  return <div className={styles.count}>{users}</div>;
}

export default UserCount;
