import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Input } from "@components/commons";
import { checkPassword } from "@api/study-room-api";
import { useInput } from "@hooks";
import styles from "./PasswordModal.module.css";

function PasswordModal({ roomId, onClose }) {
  const history = useHistory();
  const inputRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);

  const onPasswordCheck = () => {
    checkPassword(roomId, inputRef.current.value)
      .then(() => history.push(`/studyroom/${roomId}/setting`))
      .catch(() => {
        setIsInvalid(true);
        inputRef.current.value = "";
        inputRef.current.focus();
      });
  };

  const onChange = () => {
    if (isInvalid) {
      setIsInvalid(false);
    }
  };

  const { pressEnter } = useInput(inputRef, onPasswordCheck);

  const content = (
    <>
      <label htmlFor="password">
        <p className={styles.content}>비공개 스터디입니다. 비밀번호를 입력해주세요.</p>
        <Input ref={inputRef} isInvalid={isInvalid} maxLength="4" onChange={onChange} onKeyPress={pressEnter} />
      </label>
      {isInvalid && <p className={styles.error}>비밀번호를 잘못 입력했습니다. 다시 입력해주세요.</p>}
    </>
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
