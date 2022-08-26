import React, { useEffect, useState } from "react";
import styles from "./TimeRecordBlock.module.css";

function TimeRecordBlock({ startTime, endTime, color }) {
  const [blocks, setBlocks] = useState([]); // {style}

  const calculateTop = (hour) => `${hour * 25}px`; // border: 1px, height: 25px
  const calculateLeft = (minute) => `${(minute / 60) * 100}%`;
  const calculateWidth = (minute) => `calc(${(minute / 60) * 100}% - 1px)`;

  useEffect(() => {
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const endHour = endTime.getHours();
    const endMinute = endTime.getMinutes();
    const diff = (endHour - startHour) * 60 + endMinute - startMinute;

    const top = calculateTop(startHour);
    const left = calculateLeft(startMinute);

    if (diff <= 60 - startMinute) {
      setBlocks([{ top, left, width: calculateWidth(diff) }]);
    } else {
      const array = [];
      array.push({ top, left, width: calculateWidth(60 - startMinute) });
      array.push({ top: calculateTop(endHour), width: calculateWidth(endMinute) });
      for (let i = startHour + 1; i < endHour; i += 1) {
        array.push({ top: calculateTop(i), width: calculateWidth(60) });
      }
      setBlocks(array);
    }
  }, []);

  return (
    <div>
      {blocks.map((block, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className={styles.block} style={{ ...block, backgroundColor: color }} />
      ))}
    </div>
  );
}

export default React.memo(TimeRecordBlock);
