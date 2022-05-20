import React from "react";
import TimeTableGrid from "./TimeTableGrid/TimeTableGrid";
import TimeRecordBlock from "./TimeRecordBlock/TimeRecordBlock";
import styles from "./TimeTable.module.css";

// {startTime, endTime, subject, color} 리스트
function TimeTable({ timeRecordList }) {
  return (
    <div className={styles.container}>
      <TimeTableGrid />
      {timeRecordList?.map((record) => (
        <TimeRecordBlock
          startH={record.startTime.getHours()}
          startM={record.startTime.getMinutes()}
          endH={record.endTime.getHours()}
          endM={record.endTime.getMinutes()}
          color={record.color}
        />
      ))}
    </div>
  );
}

export default TimeTable;
