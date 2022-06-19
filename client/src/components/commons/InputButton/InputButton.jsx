/* eslint-disable jsx-a11y/no-autofocus */
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Hashtag, Cancel } from "@icons";
import styles from "./InputButton.module.css";

const InputButton = forwardRef(({ onSubmit, onDelete }, ref) => {
  const valueRef = useRef();
  const [value, setValue] = useState("사용자입력");
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(valueRef.current.offsetWidth);
  }, [value]);

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={submitHandler}>
      <label className={styles.content}>
        <div className={styles.icon}>
          <Hashtag />
        </div>
        <span ref={valueRef}>{value}</span>
        <input
          type="text"
          placeholder="사용자입력"
          style={{ width }}
          onChange={inputHandler}
          onBlur={() => onSubmit(value)}
          autoFocus
        />
        <div className={styles.cancel_icon} onClick={onDelete}>
          <Cancel />
        </div>
      </label>
    </form>
  );
});

export default InputButton;
