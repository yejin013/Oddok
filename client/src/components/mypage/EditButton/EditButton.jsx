import React from "react";
import styles from "./EditButton.module.css";

function EditButton({ onClick, deleteBtn }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {!deleteBtn ? "수정" : "삭제"}
    </button>
  );
}

export default EditButton;
