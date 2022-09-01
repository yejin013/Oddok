/* eslint-disable arrow-body-style */
import React, { forwardRef } from "react";
import styles from "./Textarea.module.css";

const Textarea = forwardRef(
  ({ placeholder, content, disabled, onChange, value, isInvalid, maxLength, textLength }, ref) => {
    return (
      <div className={`${styles.text_field} ${isInvalid ? styles.invalid : ""}`}>
        <textarea
          className={styles.textarea}
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          value={value}
          spellCheck="false"
          maxLength={maxLength}
        >
          {content}
        </textarea>
        {textLength !== undefined && (
          <span className={styles.text_length}>
            {textLength}/{maxLength}
          </span>
        )}
      </div>
    );
  },
);

export default Textarea;
