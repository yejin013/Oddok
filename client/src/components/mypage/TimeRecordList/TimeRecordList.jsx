import React from "react";
import TimeRecordItem from "./TimeRecordItem";
import styles from "./TimeRecordList.module.css";

function TimeRecordList({ list }) {
  return (
    <div className={styles.box}>
      {list?.map((item) => (
        <TimeRecordItem
          color={item.color} //
          title={item.subject}
          studyTime={item.studyTime}
        />
      ))}
    </div>
  );
}

export default TimeRecordList;
