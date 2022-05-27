/* eslint-disable arrow-body-style */
import React, { forwardRef } from "react";
import styles from "./Textarea.module.css";

const Textarea = forwardRef(({ placeholder, content, disabled, onChange, value }, ref) => {
  return (
    <textarea
      className={styles.box}
      ref={ref}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      value={value}
    >
      {content}
    </textarea>
  );
});

export default Textarea;
