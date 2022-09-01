import React from "react";
import { Cancel } from "@icons";
import styles from "./CloseButton.module.css";

function CloseButton({ onClose }) {
  return (
    <button type="button" className={styles.btn} onClick={onClose}>
      <Cancel />
      <span>닫기</span>
    </button>
  );
}

export default CloseButton;
