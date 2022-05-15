import React from "react";
import styles from "./TimeRecordItem.module.css";

function TimeRecordItem({ color, title, studyTime }) {
  return (
    <li className={styles.item}>
      <div className={styles.title}>
        <div className={styles.color} style={{ backgroundColor: `${color}` }} />
        <span>{title}</span>
      </div>
      <span>{studyTime}</span>
    </li>
  );
}

export default TimeRecordItem;
