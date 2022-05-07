/* eslint-disable arrow-body-style */
import React, { forwardRef } from "react";
import styles from "./styles.module.css";

const Textarea = forwardRef(({ placeholder, content, disabled, defaultValue }, ref) => {
  return (
    <textarea className={styles.box} ref={ref} placeholder={placeholder} disabled={disabled} value={defaultValue}>
      {content}
    </textarea>
  );
});

export default Textarea;
