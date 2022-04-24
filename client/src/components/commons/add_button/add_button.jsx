import React from "react";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import styles from "./add_button.module.css";

function AddButton({ onClick }) {
  return (
    <button type="button" className={styles.add_button} onClick={onClick}>
      <div className={styles.icon}>
        <Plus />
      </div>
    </button>
  );
}

export default AddButton;
