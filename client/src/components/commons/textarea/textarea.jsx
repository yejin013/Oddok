/* eslint-disable arrow-body-style */
import React, { forwardRef } from "react";

import styles from "./textarea.module.css";

const Textarea = forwardRef(({ placeholder, content, disabled }, ref) => {
  return (
    <textarea className={styles.box} ref={ref} placeholder={placeholder} disabled={disabled}>
      {content}
    </textarea>
  );
});

export default Textarea;