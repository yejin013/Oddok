import React from "react";
import { useAsync, useModal } from "@hooks";
import { getMyRoom } from "@api/mypage-api";
import { Room, EditButton, MyRoomEditModal } from "@components/mypage";
import styles from "./MyRoom.module.css";

function MyRoom() {
  const { data: myRoomData, request: refetchMyRoom } = useAsync({ requestFn: getMyRoom, skip: false });
  const { isModal, openModal, closeModal } = useModal();

  return (
    <>
      {isModal && <MyRoomEditModal roomData={myRoomData} onClose={closeModal} refetch={refetchMyRoom} />}
      <section>
        <div className={styles.heading}>
          <div>생성 스터디룸</div>
          {myRoomData && <EditButton onClick={openModal} />}
        </div>
        <div className={styles.sub_heading}>생성한 스터디룸</div>
        <div className={styles.contents}>
          {myRoomData ? <Room roomData={myRoomData} /> : <div className={styles.no_content}>없습니다.</div>}
        </div>
      </section>
    </>
  );
}
export default MyRoom;
