import React from "react";
import { ReactComponent as Person } from "../../../assets/icons/person-fill.svg";
import styles from "./user_count.module.css";

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
