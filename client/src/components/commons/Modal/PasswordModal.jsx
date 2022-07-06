/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Modal, Input } from "@components/commons";
import styles from "./PasswordModal.module.css";

function PasswordModal({ onClose }) {
  const content = (
    <label>
      <p className={styles.content}>비공개 스터디입니다. 비밀번호를 입력해주세요.</p>
      <Input />
    </label>
  );

  return (
    <Modal
      title="비밀번호"
      content={content}
      onClose={onClose}
      onAction={{
        text: "확인",
        action: () => {
          onClose();
        },
      }}
    />
  );
}
export default PasswordModal;
