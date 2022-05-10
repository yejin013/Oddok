/* eslint-disable arrow-body-style */
import React, { forwardRef, useImperativeHandle } from "react";
import { ReactComponent as SendButton } from "../../../assets/icons/send-button.svg";
import styles from "./input.module.css";

const Input = forwardRef(
  ({ type, placeholder, maxLength, onChange, isInvalid, disabled, value, isPlanBar, isChatBar }, inputRef) => {
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
          disabled={disabled}
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
