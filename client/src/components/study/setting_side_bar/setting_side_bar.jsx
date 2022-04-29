/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user_state";
import { updateStudyRoom } from "../../../api/study-room-api";
import useAsync from "../../../hooks/useAsync";
import ErrorModal from "../../commons/ErrorModal/ErrorModal";
import { ReactComponent as Hashtag } from "../../../assets/icons/hashtag.svg";
import { ReactComponent as Play } from "../../../assets/icons/play-fill.svg";
import { ReactComponent as Pause } from "../../../assets/icons/pause-fill.svg";

import styles from "./setting_side_bar.module.css";

function SettingSideBar({ session, roomInfo, clickDetailBtn }) {
  const { id } = useParams();
  const { updateAllowed } = useRecoilValue(userState);
  const { error, sendRequest: updateRoom } = useAsync(() => updateStudyRoom(id, roomInfo), [id, roomInfo]);
  const [isPlay, setIsPlay] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(error?.response);
  }, [error]);

  const toggleBgm = () => {
    setIsPlay((prev) => !prev);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const updateResponse = await updateRoom(id, roomInfo);
    session
      .signal({
        data: JSON.stringify(updateResponse), // JSON stringify 해야됨!
        to: [],
        type: "updated-roominfo",
      })
      .then(() => console.log("데이터 잘 갔엉🙂👋"))
      .catch((e) => console.error(e));
  };

  const confirmError = () => {
    setHasError(false);
  };

  return (
    <>
      {hasError && <ErrorModal message={`${hasError?.status} ${hasError?.data.message}`} onConfirm={confirmError} />}
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
    </>
  );
}

export default SettingSideBar;
