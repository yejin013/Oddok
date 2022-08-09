import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Input } from "@components/commons";
import { checkPassword } from "@api/study-room-api";
import styles from "./PasswordModal.module.css";

function PasswordModal({ roomId, onClose }) {
  const history = useHistory();
  const inputRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onPasswordCheck();
    }
  };

  const content = (
    <>
      <label htmlFor="password">
        <p className={styles.content}>비공개 스터디입니다. 비밀번호를 입력해주세요.</p>
        <Input ref={inputRef} isInvalid={isInvalid} maxLength="4" onChange={onChange} onKeyPress={onKeyPress} />
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
