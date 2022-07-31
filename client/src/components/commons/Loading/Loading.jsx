import React from "react";
import loading from "../../../assets/loading.gif";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.container}>
      <img className={styles.loading} src={loading} alt="loading" />
    </div>
  );
}

export default Loading;
