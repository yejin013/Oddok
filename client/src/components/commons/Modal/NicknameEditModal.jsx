import React, { useState } from "react";
import { Modal, Input } from "@components/commons";
import { editNickname } from "@api/user-api";
import { useRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import styles from "./NicknameEditModal.module.css";

function NicknameEditModal({ onClose }) {
  const [user, setUserState] = useRecoilState(userState);
  const [nickname, setNickname] = useState(user.nickname);

  const onChange = (event) => {
    if (event.currentTarget == null) {
      return;
    }
    event.preventDefault();
    setNickname(event.currentTarget.value);
  };

  const changeNickname = async (name) => {
    const response = await editNickname(name);
    setUserState((prev) => ({ ...prev, nickname: response.nickname }));
  };

  const content = (
    <div className={styles.box}>
      <p>닉네임</p>
      <Input value={nickname} onChange={onChange} />
    </div>
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
    />
  );
}

export default NicknameEditModal;
