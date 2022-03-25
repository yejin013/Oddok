import React from "react";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import styles from "./add_button.module.css";

function AddButton({ onClick }) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <Plus />
    </button>
  );
}

export default AddButton;
