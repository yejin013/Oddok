import React, { useEffect, useState } from "react";
import styles from "./TimeRecordBlock.module.css";

function TimeRecordBlock({ startH, startM, endH, endM, color }) {
  const [blocks, setBlocks] = useState([]); // {style}

  const calculateTop = (hour) => `${1 + hour * 25}px`; // border: 1px, 그리드셀 height: 25px
  const caculateLeft = (minute) => `${(minute / 60) * 100}%`;
  const caculateRight = (minute) => `${(1 - minute / 60) * 100}%`;
  const subBorder = (width) => `calc(${width}% - 1px)`; // substract 1px border

  useEffect(() => {
    const diff = endH * 60 + endM - (startH * 60 + startM); // 분
    const startTop = calculateTop(startH);
    const endTop = calculateTop(endH);
    const startLeft = caculateLeft(startM);
    const endRight = caculateRight(endM);

    // 한 줄!!
    if (diff <= (startH + 1) * 60 - (startH * 60 + startM)) {
      setBlocks([{ top: startTop, left: startLeft, width: subBorder((diff / 60) * 100) }]);
    }
    // 여러 줄!!
    else {
      const array = [{ top: startTop, left: startLeft, width: subBorder(((60 - startM) / 60) * 100) }];
      for (let i = startH + 1; i < endH; i += 1) {
        array.push({ top: calculateTop(parseInt(i, 10)), left: "1px", width: "calc(100% - 2px)" });
      }
      array.push({ top: endTop, right: endRight, width: subBorder((endM / 60) * 100) });
      setBlocks(array);
    }
  }, [startH, startM, endH, endM]);

  return (
    <div>
      {blocks.map((block) => (
        <div className={styles.block} style={{ ...block, backgroundColor: color }} />
      ))}
    </div>
  );
}

export default TimeRecordBlock;
