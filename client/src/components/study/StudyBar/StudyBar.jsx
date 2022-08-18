import React from "react";
import { useRecoilValue } from "recoil";
import { roomInfoState } from "@recoil/studyroom-state";
import { Setting, Music, VideoOn, VideoOff, MicOn, MicOff, Chat, Member, Door } from "@icons";
import SubjectTime from "../SubjectTime/SubjectTime";
import styles from "./StudyBar.module.css";

function StudyBar({ toggleVideo, toggleAudio, videoActive, audioActive, clickSideBarBtn, onClickLeaveBtn }) {
  const roomInfo = useRecoilValue(roomInfoState);

  return (
    <section className={styles.bar}>
      <div className={styles.info}>
        <button type="button" onClick={() => clickSideBarBtn("SETTING")}>
          <Setting />
        </button>
        <span>{roomInfo.name}</span>
        <div className={styles.music}>
          <i>
            <Music />
          </i>
          <span>소녀시대 - 힘내!</span>
        </div>
      </div>
      <div className={styles.time}>
        <SubjectTime onPlanBtnClick={() => clickSideBarBtn("PLAN")} />
      </div>
      <ul className={styles.buttons}>
        <li className={styles.video_button}>
          {videoActive ? (
            <button type="button" onClick={toggleVideo}>
              <VideoOn />
            </button>
          ) : (
            <button type="button" className={styles.off} onClick={toggleVideo}>
              <VideoOff />
            </button>
          )}
        </li>
        <li className={styles.audio_button}>
          {audioActive ? (
            <button type="button" onClick={toggleAudio}>
              <MicOn />
            </button>
          ) : (
            <button type="button" className={styles.off} onClick={toggleAudio}>
              <MicOff />
            </button>
          )}
        </li>
        <li className={styles.chat_button}>
          <button type="button" onClick={() => clickSideBarBtn("CHATTING")}>
            <Chat />
          </button>
        </li>
        <li className={styles.member_button}>
          <button type="button" onClick={() => clickSideBarBtn("PARTICIPANT")}>
            <Member />
          </button>
        </li>
        <li className={styles.door_button}>
          <button type="button" onClick={onClickLeaveBtn}>
            <Door />
          </button>
        </li>
      </ul>
    </section>
  );
}

export default StudyBar;
