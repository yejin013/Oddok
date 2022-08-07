import React from "react";
import { Setting, Music, VideoOn, VideoOff, MicOn, MicOff, Chat, Member, Door } from "@icons";
import SubjectTime from "../SubjectTime/SubjectTime";
import styles from "./StudyBar.module.css";

function StudyBar({ roomName, toggleVideo, toggleAudio, isPlaying, isMuted, clickSideBarBtn, onClickLeaveBtn }) {
  return (
    <section className={styles.bar}>
      <div className={styles.info}>
        <button type="button">
          <Setting onClick={() => clickSideBarBtn("SETTING")} />
        </button>
        <span>{roomName}</span>
        <div className={styles.music}>
          <i className={styles.music_icon}>
            <Music />
          </i>
          <span>소녀시대 - 힘내!</span>
        </div>
      </div>
      <div className={styles.time}>
        <SubjectTime onClickplanBtn={() => clickSideBarBtn("PLAN")} />
      </div>
      <ul className={styles.buttons}>
        <li className={styles.video_button}>
          {isPlaying ? (
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
          {isMuted ? (
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
