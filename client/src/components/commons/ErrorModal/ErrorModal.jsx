import React from "react";
import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from "../../../assets/icons/x.svg";

import styles from "./ErrorModal.module.css";

function ErrorModal({ message, onConfirm, onAction }) {
  return (
    <>
      {createPortal(<div className={styles.backdrop} onClick={onConfirm} />, document.getElementById("backdrop-root"))}
      {createPortal(
        <div className={styles.overlay}>
          <div className={styles.modal_box}>
            <header className={styles.header}>
              <div className={styles.icon} onClick={onConfirm}>
                <CloseIcon />
              </div>
            </header>
            <div className={styles.content}>{message}</div>
            <footer className={styles.actions}>
              {onAction && (
                <button type="button" onClick={onAction.action}>
                  {onAction.text}
                </button>
              )}
              <button type="button" onClick={onConfirm}>
                확인
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
