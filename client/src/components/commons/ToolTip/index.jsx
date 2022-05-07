import React from "react";
import styles from "./styles.module.css";

function ToolTip({ type, message }) {
  return <div className={`${styles.tooltip} ${type === "left" && styles.left}`}>{message}</div>;
}

export default ToolTip;
