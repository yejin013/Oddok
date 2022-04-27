import React from "react";
import { createPortal } from "react-dom";

import styles from "./ErrorModal.module.css";

function ErrorModal({ title, message, onConfirm }) {
  return (
    <>
      {createPortal(<div className={styles.backdrop} onClick={onConfirm} />, document.getElementById("backdrop-root"))}
      {createPortal(
        <div className={styles.overlay}>
          <div className={styles.modal_box}>
            <header className={styles.header}>
              <h2>⚠️ ERROR ⚠️</h2>
            </header>
            <div className={styles.content}>{message}</div>
            <footer className={styles.actions}>
              <button type="button" onClick={onConfirm}>
                OK
              </button>
            </footer>
          </div>
        </div>,
        document.getElementById("overlay-root"),
      )}
    </>
  );
}

export default ErrorModal;
