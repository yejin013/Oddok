import React, { useState, useRef, useEffect } from "react";
import { Modal, Input } from "@components/commons";
import { editNickname } from "@api/user-api";
import { useRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import styles from "./NicknameEditModal.module.css";

function NicknameEditModal({ onClose }) {
  const [user, setUserState] = useRecoilState(userState);
  const [nickname, setNickname] = useState(user.nickname);
  const inputRef = useRef();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onChange = (event) => {
    event.preventDefault();
    if (!event.currentTarget.value) {
      setIsDisabled(true);
    } else if (event.currentTarget.value && isDisabled) {
      setIsDisabled(false);
    }
    setNickname(event.currentTarget.value);
  };

  const changeNickname = async (name) => {
    const response = await editNickname(name);
    setUserState((prev) => ({ ...prev, nickname: response.nickname }));
  };

  const onKeyPress = (event) => {
    if (isDisabled) {
      return;
    }
    if (event.key === "Enter") {
      changeNickname(nickname);
      onClose();
    }
  };

  const content = (
    <label htmlFor="nickname">
      <p className={styles.content}>닉네임</p>
      <Input ref={inputRef} value={nickname} maxLength="8" onChange={onChange} onKeyPress={onKeyPress} />
    </label>
  );

  return (
    <Modal
      title="닉네임 수정"
      content={content}
      onClose={onClose}
      onAction={{
        text: "확인",
        action: () => {
          changeNickname(nickname);
          onClose();
        },
      }}
      disabled={isDisabled}
    />
  );
}

export default NicknameEditModal;
