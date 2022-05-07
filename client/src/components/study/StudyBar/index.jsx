import React from "react";
import { Setting, Music, VideoOn, MicOff, Chat, Member, Door } from "@icons";
import SubjectTime from "../SubjectTime";
import styles from "./study_bar.module.css";

function StudyBar({ roomName, clickSettingBtn, toggleVideo, toggleAudio, clickChatBtn, onClickplanBtn, leaveRoom }) {
  return (
    <section className={styles.bar}>
      <div className={styles.info}>
        <button type="button">
          <Setting onClick={clickSettingBtn} />
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
        <SubjectTime onClickplanBtn={onClickplanBtn} />
      </div>
      <ul className={styles.buttons}>
        <li className={styles.video_button}>
          <button type="button" onClick={toggleVideo}>
            <VideoOn />
          </button>
        </li>
        <li className={styles.audio_button}>
          <button type="button" onClick={toggleAudio}>
            <MicOff />
          </button>
        </li>
        <li className={styles.chat_button}>
          <button type="button" onClick={clickChatBtn}>
            <Chat />
          </button>
        </li>
        <li className={styles.member_button}>
          <button type="button">
            <Member />
          </button>
        </li>
        <li className={styles.door_button}>
          <button type="button" onClick={leaveRoom}>
            <Door />
          </button>
        </li>
      </ul>
    </section>
  );
}

export default StudyBar;
