import React, { forwardRef } from "react";
import styles from "./DateInput.module.css";

const DateInput = forwardRef(({ value, onClick }, ref) => (
  <button type="button" className={styles.date_input} onClick={onClick} ref={ref}>
    {value}
  </button>
));

export default DateInput;
