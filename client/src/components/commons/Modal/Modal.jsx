import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { Close } from "@icons";
import useOutSideClick from "@hooks/useOutSideClick";
import styles from "./Modal.module.css";

function Modal({ title, content, onClose, onAction, onSubAction, disabled }) {
  const modalRef = useRef();

  useOutSideClick(modalRef, onClose);

  return (
    <>
      {createPortal(<div className={styles.backdrop} />, document.getElementById("backdrop-root"))}
      {createPortal(
        <div className={styles.overlay} ref={modalRef}>
          <header>
            <div>{title}</div>
            <div className={styles.icon} onClick={onClose}>
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
            <button className={styles.main_btn} type="button" onClick={onAction.action} disabled={disabled}>
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
