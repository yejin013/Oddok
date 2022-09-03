import React from "react";
import styles from "./ToggleButton.module.css";

function ToggleButton({ icon, label, onToggle, checked, ...props }) {
  return (
    <label className={styles.toggle_button}>
      <input type="checkbox" value={label} onChange={onToggle} checked={checked} {...props} />
      <div className={styles.content}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{label}</span>
      </div>
    </label>
  );
}

export default ToggleButton;
