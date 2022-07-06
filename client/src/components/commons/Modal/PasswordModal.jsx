/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from "react";
import { Modal, Input } from "@components/commons";
import { checkPassword } from "@api/study-room-api";
import styles from "./PasswordModal.module.css";

function PasswordModal({ roomId, onClose }) {
  const inputRef = useRef();

  const onPasswordCheck = () => {
    try {
      const response = checkPassword(roomId, inputRef.current.value);
      console.log("비밀번호", response);
    } catch (error) {
      console.error("비밀번호 에러", error);
    }
  };

  const content = (
    <label>
      <p className={styles.content}>비공개 스터디입니다. 비밀번호를 입력해주세요.</p>
      <Input ref={inputRef} />
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
          onPasswordCheck();
        },
      }}
    />
  );
}

export default PasswordModal;
