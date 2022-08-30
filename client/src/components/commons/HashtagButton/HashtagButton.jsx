import React from "react";
import { Hashtag, Cancel } from "@icons";
import styles from "./HashtagButton.module.css";

function HashtagButton({ label, onToggle, onDelete, checked }) {
  return (
    <label className={styles.toggle_button}>
      <input type="checkbox" value={label} onChange={onToggle} checked={checked} />
      <div className={styles.content}>
        <div className={styles.icon}>
          <Hashtag />
        </div>
        <span>{label}</span>
        {onDelete && (
          <div className={styles.cancel_icon} onClick={onDelete}>
            <Cancel />
          </div>
        )}
      </div>
    </label>
  );
}

export default React.memo(HashtagButton);
