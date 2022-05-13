import React, { forwardRef } from "react";
import styles from "./CustomInput.module.css";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button type="button" className={styles.date_input} onClick={onClick} ref={ref}>
    {value}
  </button>
));

export default CustomInput;
