import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomInfoState } from "@recoil/studyroom-state";
import { userState } from "@recoil/user-state";
import { Hashtag, Play, Pause } from "@icons";
import { updateStudyRoom } from "@api/study-room-api";
import { SettingForm } from "..";
import styles from "./SettingSideBar.module.css";

function SettingSideBar({ session }) {
  const { roomId } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const { updateAllowed } = useRecoilValue(userState);

  const clickDetailBtn = () => setIsFormOpen((prev) => !prev);

  const updateRoomInfo = async (data) => {
    try {
      const res = await updateStudyRoom(roomId, data);
      session?.signal({
        data: JSON.stringify(res),
        to: [],
        type: "roomDataUpdated",
      });
      setRoomInfo(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isFormOpen && <SettingForm onClose={clickDetailBtn} onUpdate={updateRoomInfo} />}
      <aside className={styles.side_box}>
        <h1>{roomInfo.name}</h1>
        <div className={styles.roomInfo_item}>
          <div className={styles.hashtag}>
            {roomInfo.hashtags.map((hashtag) => (
              <div>
                <div className={styles.icon}>
                  <Hashtag />
                </div>
                <div>{hashtag}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.info_item}>
          <p>목표시간</p>
          <div className={styles.text_field}>{roomInfo.targetTime}시간</div>
        </div>
        <div className={`${styles.info_item} ${styles.rule}`}>
          <p>스터디 규칙</p>
          <div className={`${styles.text_field} ${styles.text_area}`}>{roomInfo.rule ? roomInfo.rule : "없음"}</div>
        </div>
        {updateAllowed && (
          <button className={styles.button} type="submit" onClick={clickDetailBtn}>
            방 정보 수정
          </button>
        )}
      </aside>
    </>
  );
}

export default SettingSideBar;
