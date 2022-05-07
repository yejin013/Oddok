/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Hashtag, Cancel } from "@icons";
import styles from "./styles.module.css";

function HashtagButton({ label, onToggle, onDelete, disabled, checked }) {
  return (
    <label className={styles.toggle_button} onChange={onToggle}>
      <input type="checkbox" value={label} disabled={disabled} checked={checked} />
      <div className={styles.content}>
        <div className={styles.icon}>
          <Hashtag />
        </div>
        <span>{label}</span>
        {!disabled && onDelete && (
          <div className={styles.cancel_icon} onClick={onDelete}>
            <Cancel />
          </div>
        )}
      </div>
    </label>
  );
}

export default HashtagButton;
