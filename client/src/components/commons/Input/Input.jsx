/* eslint-disable arrow-body-style */
import React, { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(({ type, placeholder, maxLength, onChange, isInvalid, value, onKeyPress }, inputRef) => {
  return (
    <input
      className={`${styles.input} ${isInvalid ? styles.invalid : ""}`}
      type={type ?? "text"}
      ref={inputRef}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={onChange}
      value={value}
      spellCheck="false"
      onKeyPress={onKeyPress}
    />
  );
});

export default Input;
