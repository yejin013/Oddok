import React from "react";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import styles from "./add_button.module.css";

function AddButton() {
  return (
    <div className={styles.button}>
      <Plus />
    </div>
  );
}

export default AddButton;
