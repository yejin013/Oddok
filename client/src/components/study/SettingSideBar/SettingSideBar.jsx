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

  const toggleSettingForm = () => setIsFormOpen((prev) => !prev);

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
      {isFormOpen && <SettingForm onClose={toggleSettingForm} onUpdate={updateRoomInfo} />}
      <aside className={styles.side_box}>
        <h1>{roomInfo.name}</h1>
        <div>
          <ul className={styles.hashtags}>
            {roomInfo.hashtags.map((hashtag) => (
              <li key={hashtag}>
                <Hashtag />
                <span>{hashtag}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className={styles.label}>스터디 기간</span>
          <div className={styles.text_field}>{roomInfo.endAt}</div>
        </div>
        <div className={styles.rule}>
          <span className={styles.label}>스터디 규칙</span>
          <div className={styles.text_field}>{roomInfo.rule ? roomInfo.rule : "없음"}</div>
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
