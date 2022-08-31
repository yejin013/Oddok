import React from "react";
import TimeRecordItem from "./TimeRecordItem";
import styles from "./TimeRecordList.module.css";

function TimeRecordList({ list }) {
  return (
    <div className={styles.wrapper}>
      {list?.map((item, i) => (
        <TimeRecordItem
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          color={item.color} //
          title={item.subject}
          studyTime={item.studyTime}
        />
      ))}
    </div>
  );
}

export default TimeRecordList;
