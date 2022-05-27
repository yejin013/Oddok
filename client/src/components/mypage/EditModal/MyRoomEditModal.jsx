import React from "react";
import { Modal } from "@components/commons";
import { MyRoom } from "@components/mypage";
import EditButton from "../EditButton/EditButton";
import styles from "./MyRoomEditModal.module.css";

function MyRoomEditModal({ roomData, onClose }) {
  const data = {
    name: "공시생 1호실",
    hashtags: ["해시태그1개", "해시태그2개", "해시태그3개", "gogogogogo", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
    endAt: "2022. 05. 01까지",
  };
  const content = (
    <div className={styles.box}>
      <p>생성 스터디룸</p>
      <div className={styles.item}>
        <div>
          <MyRoom roomData={data} />
        </div>
        <div className={styles.buttons}>
          <EditButton />
          <EditButton deleteBtn />
        </div>
      </div>
    </div>
  );
  return <Modal title="스터디룸 수정" content={content} onClose={onClose} onAction={{ text: "확인" }} />;
}

export default MyRoomEditModal;
