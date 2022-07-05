import React, { useState } from "react";
import { updateStudyRoom } from "@api/study-room-api";
import { deleteStudyRoom } from "@api/mypage-api";
import { Modal } from "@components/commons";
import { SettingForm } from "@components/study";
import { MyRoom } from "@components/mypage";
import EditButton from "../EditButton/EditButton";
import styles from "./MyRoomEditModal.module.css";

function MyRoomEditModal({ roomData, onClose, refetch }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const editHandler = () => {
    setIsFormOpen(true);
  };

  const updateMyRoom = async (data) => {
    try {
      await updateStudyRoom(roomData.id, data);
      onClose();
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteHandler = async () => {
    try {
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        await deleteStudyRoom(roomData.id);
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
      {isFormOpen ? (
        <SettingForm roomData={roomData} onClose={() => setIsFormOpen(false)} onUpdate={updateMyRoom} />
      ) : (
        <Modal
          title="스터디룸 수정"
          content={content}
          onClose={onClose}
          onAction={{
            text: "확인",
            action: () => {
              onClose();
              refetch();
            },
          }}
        />
      )}
    </div>
  );
}

export default MyRoomEditModal;
