import React from "react";
import TimeTableGrid from "./TimeTableGrid/TimeTableGrid";
import TimeRecordBlock from "./TimeRecordBlock/TimeRecordBlock";
import styles from "./TimeTable.module.css";

// {startTime, endTime, subject} 리스트
function TimeTable({ startH, startM, endH, endM, isShow }) {
  return (
    <div className={styles.container}>
      <TimeTableGrid />
      {isShow && <TimeRecordBlock startH={startH} startM={startM} endH={endH} endM={endM} />}
    </div>
  );
}

export default TimeTable;
