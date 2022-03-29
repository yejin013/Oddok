/* eslint-disable arrow-body-style */
import React, { forwardRef, useImperativeHandle } from "react";

import styles from "./input.module.css";

const Input = forwardRef(({ type, placeholder, isInvalid, disabled }, inputRef) => {
  // useImperativeHandle(inputRef, () => {
  //   return {
  //     focus: () => inputRef.current.focus(),
  //   };
  // });

  return (
    <div className={`${styles.container} ${!isInvalid ? "" : styles.invalid}`}>
      <input type={type || "text"} ref={inputRef} placeholder={placeholder} disabled={disabled} />
    </div>
  );
});

export default Input;
