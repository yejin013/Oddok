import React, { forwardRef } from "react";
import styles from "./DateInput.module.css";

const DateInput = forwardRef(({ value, placeholderText, onClick }, ref) => (
  <button
    type="button"
    className={`${styles.date_input} ${value ? "" : styles.placeholder}`}
    onClick={onClick}
    ref={ref}
  >
    {value || placeholderText}
  </button>
));

export default DateInput;
