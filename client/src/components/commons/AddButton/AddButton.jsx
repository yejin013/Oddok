import React from "react";
import { Plus } from "@icons";
import styles from "./AddButton.module.css";

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
