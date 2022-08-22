import React, { useState } from "react";
import { updateStudyRoom } from "@api/study-room-api";
import { deleteStudyRoom } from "@api/mypage-api";
import { Modal } from "@components/commons";
import { SettingForm } from "@components/study";
import { Room, EditButton } from "@components/mypage";
import styles from "./MyRoomEditModal.module.css";

function MyRoomEditModal({ roomData, onClose, refetch }) {
  const [inputData, setInputData] = useState(roomData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const editHandler = () => {
    setIsFormOpen(true);
  };

  const updateMyRoom = async () => {
    try {
      await updateStudyRoom(roomData.id, inputData);
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteHandler = async () => {
    try {
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        await deleteStudyRoom(roomData.id);
        refetch();
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
        <div>
          <Room roomData={inputData} />
        </div>
        <div className={styles.buttons}>
          <EditButton onClick={editHandler} />
          <EditButton onClick={deleteHandler} deleteBtn />
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {isFormOpen ? (
        <SettingForm roomData={roomData} onClose={() => setIsFormOpen(false)} onUpdate={(data) => setInputData(data)} />
      ) : (
        <Modal
          title="스터디룸 수정"
          content={content}
          onClose={onClose}
          onAction={{
            text: "확인",
            action: () => {
              updateMyRoom();
              onClose();
            },
          }}
        />
      )}
    </div>
  );
}

export default MyRoomEditModal;
