import React from "react";
import styles from "./TimeTableGrid.module.css";

function TimeTableGrid() {
  const render = () => {
    const result = [];
    for (let i = 0; i < 6 * 24; i += 1) {
      result.push(<div className={styles.gridcell} />);
    }
    return result;
  };
  return <div className={styles.grid}>{render()}</div>;
}

// export default React.memo(TimeTableGrid);
export default TimeTableGrid;
