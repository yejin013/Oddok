import React from "react";
import styles from "./RadioButton.module.css";

function RadioButton({ group, label, onChange, checked }) {
  return (
    <label className={styles.radio_item}>
      <input type="radio" name={group} value={label} onChange={onChange} checked={checked} />
      <p>{label}</p>
    </label>
  );
}

export default RadioButton;
