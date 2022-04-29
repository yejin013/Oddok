/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user_state";
import { ReactComponent as Hashtag } from "../../../assets/icons/hashtag.svg";
import { ReactComponent as Play } from "../../../assets/icons/play-fill.svg";
import { ReactComponent as Pause } from "../../../assets/icons/pause-fill.svg";
import { updateStudyRoom } from "../../../api/study-room-api";

import styles from "./side_bar.module.css";

function SettingSideBar({ session, roomInfo, clickDetailBtn }) {
  const { updateAllowed } = useRecoilValue(userState);
  const textRef = useRef();

  const [isPlay, setIsPlay] = useState(false);

  const toggleBgm = () => {
    setIsPlay((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await updateStudyRoom(roomInfo.id, roomInfo);
    console.log("수정정보", res);

    // 수정된 정보 브로드캐스트하기
    session
      .signal({
        data: JSON.stringify(roomInfo), // JSON stringify 해야됨!
        to: [],
        type: "updated-roominfo",
      })
      .then(() => console.log("데이터 잘 갔엉🙂👋"))
      .catch((error) => console.error(error));
  };

  return (
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
      <div className={`${styles.info_item} ${styles.rule_field}`}>
        <p>스터디 규칙</p>
        <div className={`${styles.text_field} ${styles.text_area}`}>{roomInfo.rule ? roomInfo.rule : "없음"}</div>
      </div>
      <div className={styles.info_item}>
        <p>음악</p>
        <div className={styles.bgm_field}>
          <span className={styles.bgm_icon} onClick={toggleBgm}>
            {isPlay ? <Pause /> : <Play />}
          </span>
          <span>소녀시대 - 힘내!</span>
        </div>
      </div>
      {updateAllowed && (
        <div className={styles.buttons}>
          <button className={styles.button} type="button" onClick={clickDetailBtn}>
            세부 설정
          </button>
          <button className={styles.button} type="submit" onClick={submitHandler}>
            방 정보 수정
          </button>
        </div>
      )}
    </aside>
  );
}

export default SettingSideBar;
