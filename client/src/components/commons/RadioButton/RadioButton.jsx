import React from "react";
import styles from "./RadioButton.module.css";

function RadioButton({ group, label, value, onChange, checked }) {
  return (
    <label className={styles.radio_item}>
      <input type="radio" name={group} value={value} onChange={onChange} checked={checked} />
      <span>{label}</span>
    </label>
  );
}

export default React.memo(RadioButton);
