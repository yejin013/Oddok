import React from "react";
import TimeTableGrid from "./TimeTableGrid/TimeTableGrid";
import TimeRecordBlock from "./TimeRecordBlock/TimeRecordBlock";

function TimeTable({ timeRecordList }) {
  return (
    <TimeTableGrid>
      {timeRecordList?.map((record, i) => (
        <TimeRecordBlock
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          startTime={record.startTime}
          endTime={record.endTime}
          color={record.color}
        />
      ))}
    </TimeTableGrid>
  );
}

export default TimeTable;
