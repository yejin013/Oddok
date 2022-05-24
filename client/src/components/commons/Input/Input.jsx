/* eslint-disable arrow-body-style */
import React, { forwardRef, useImperativeHandle } from "react";
import { SendButton } from "@icons";
import styles from "./Input.module.css";

const Input = forwardRef(
  ({ type, placeholder, maxLength, onChange, isInvalid, value, isPlanBar, isChatBar }, inputRef) => {
    // useImperativeHandle(inputRef, () => {
    //   return {
    //     focus: () => inputRef.current.focus(),
    //   };
    // });

    return (
      <div className={`${styles.container} ${!isInvalid ? "" : styles.invalid}`}>
        <input
          type={type || "text"}
          ref={inputRef}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
          value={value}
        />
        {(isPlanBar || isChatBar) && (
          <button type="submit" className={styles.button}>
            <SendButton />
          </button>
        )}
      </div>
    );
  },
);

export default Input;
