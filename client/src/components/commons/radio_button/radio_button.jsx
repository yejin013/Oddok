import React from "react";

import styles from "./radio_button.module.css";

function RadioButton({ group, label, onChange }) {
  return (
    <label className={styles.radio_item}>
      <input type="radio" name={group} value={label} onChange={onChange} />
      <p>{label}</p>
    </label>
  );
}

export default RadioButton;
