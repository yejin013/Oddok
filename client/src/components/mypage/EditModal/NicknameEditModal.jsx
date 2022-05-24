import React from "react";
import { Modal, Input } from "@components/commons";
import styles from "./NicknameEditModal.module.css";

function NicknameEditModal() {
  const content = (
    <div className={styles.box}>
      <p>닉네임</p>
      <Input />
    </div>
  );
  return <Modal title="닉네임 수정" content={content} onAction={{ text: "확인" }} />;
}

export default NicknameEditModal;
