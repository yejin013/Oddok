import React from "react";
import styles from "./ToggleButton.module.css";

function ToggleButton({ icon, label, onToggle, checked }) {
  return (
    <label className={styles.toggle_button} onChange={onToggle}>
      <input type="checkbox" value={label} checked={checked} />
      <div className={styles.content}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{label}</span>
      </div>
    </label>
  );
}

export default ToggleButton;
