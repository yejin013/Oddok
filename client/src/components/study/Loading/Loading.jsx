import React from "react";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.text}>🕓</div>
    </div>
  );
}

export default Loading;
