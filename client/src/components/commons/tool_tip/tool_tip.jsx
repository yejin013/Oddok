import React from "react";

import styles from "./tool_tip.module.css";

function ToolTip({ message }) {
  return <div className={styles.tooltip}>{message}</div>;
}

export default ToolTip;
