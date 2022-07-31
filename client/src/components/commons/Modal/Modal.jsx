import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Close } from "@icons";
import styles from "./Modal.module.css";

function Modal({ title, content, onClose, onAction, onSubAction }) {
  const modalRef = useRef();

  const onOutsideClick = (event) => {
    if (!modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, []);

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
