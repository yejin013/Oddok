import React from "react";
import styles from "./TimeTableGrid.module.css";

function TimeTableGrid({ children }) {
  const render = () => {
    const result = [];
    for (let i = 0; i < 6 * 24; i += 1) {
      result.push(<div className={styles.gridcell} key={i} />);
    }
    return result;
  };
  return (
    <div className={styles.grid}>
      {render()}
      {children}
    </div>
  );
}

export default React.memo(TimeTableGrid);
