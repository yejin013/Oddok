import React, { useState } from "react";
import { deleteStudyRoom } from "@api/mypage-api";
import { Modal } from "@components/commons";
import { MyRoom } from "@components/mypage";
import EditButton from "../EditButton/EditButton";
import styles from "./MyRoomEditModal.module.css";

function MyRoomEditModal({ roomData, onFormOpen, onClose, onUpdate }) {
  const editHandler = () => {
    onFormOpen(true);
    onClose();
  };

  const deleteHandler = async () => {
    try {
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        await deleteStudyRoom(1);
        onUpdate();
        onClose();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const content = (
    <div className={styles.box}>
      <p>생성 스터디룸</p>
      <div className={styles.item}>
        {roomData && (
          <>
            <div>
              <MyRoom roomData={roomData} />
            </div>
            <div className={styles.buttons}>
              <EditButton onClick={editHandler} />
              <EditButton onClick={deleteHandler} deleteBtn />
            </div>
          </>
        )}
      </div>
    </div>
  );
  return (
    <div>
      <Modal title="스터디룸 수정" content={content} onClose={onClose} onAction={{ text: "확인", action: onClose }} />
    </div>
  );
}

export default MyRoomEditModal;
