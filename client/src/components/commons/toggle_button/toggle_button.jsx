import React, { useState, useEffect } from "react";
import styles from "./toggle_button.module.css";

function ToggleButton({ icon, label, onToggle, disabled }) {
  return (
    <label className={styles.toggle_button} onChange={onToggle}>
      <input type="checkbox" value={label} disabled={disabled} />
      <span className={styles.content}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{label}</span>
      </span>
    </label>
  );
}

export default ToggleButton;
