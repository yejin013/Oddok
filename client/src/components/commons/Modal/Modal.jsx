import React from "react";
import { createPortal } from "react-dom";
import { Close } from "@icons";
import styles from "./Modal.module.css";

function Modal({ title, content, onConfirm, onAction, onSubAction }) {
  return (
    <>
      {createPortal(<div className={styles.backdrop} />, document.getElementById("backdrop-root"))}
      {createPortal(
        <div className={styles.overlay}>
          <header>
            <div>{title}</div>
            <div className={styles.icon} onClick={onConfirm}>
              <Close />
            </div>
          </header>
          <div className={styles.content}>{content}</div>
          <footer>
            {onSubAction && (
              <button className={styles.sub_btn} type="button" onClick={onSubAction.action}>
                {onSubAction.text}
              </button>
            )}
            <button className={styles.main_btn} type="button" onClick={onAction.action}>
              {onAction.text}
            </button>
          </footer>
        </div>,
        document.getElementById("overlay-root"),
      )}
    </>
  );
}

export default Modal;
