/* eslint-disable arrow-body-style */
import React, { forwardRef } from "react";
import styles from "./Textarea.module.css";

const Textarea = forwardRef(({ placeholder, content, disabled, onChange, value, isInvalid }, ref) => {
  return (
    <textarea
      className={`${styles.box} ${isInvalid ? styles.invalid : ""}`}
      ref={ref}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      value={value}
      spellCheck="false"
    >
      {content}
    </textarea>
  );
});

export default Textarea;
