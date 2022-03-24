/* eslint-disable arrow-body-style */
import React, { useRef, forwardRef } from "react";

import styles from "./input.module.css";

const Input = forwardRef(({ placeholder }, inputRef) => {
  return (
    <div className={styles.container}>
      <input type="text" ref={inputRef} placeholder={placeholder} />
    </div>
  );
});

export default Input;
