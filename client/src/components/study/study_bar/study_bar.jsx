import React from "react";
import styles from "./study_bar.module.css";
import { ReactComponent as Setting } from "../../../assets/icons/setting.svg";
import { ReactComponent as Music } from "../../../assets/icons/music.svg";
import { ReactComponent as VideoOn } from "../../../assets/icons/video.svg";
import { ReactComponent as MicOff } from "../../../assets/icons/mic_off.svg";
import { ReactComponent as Chat } from "../../../assets/icons/chat.svg";
import { ReactComponent as Member } from "../../../assets/icons/person.svg";
import { ReactComponent as Door } from "../../../assets/icons/door.svg";
import SubjectTime from "../subject_time/subject_time";

function StudyBar({
  roomName,
  clickSettingBtn,
  toggleVideo,
  toggleAudio,
  clickChatBtn,
  onClickplanBtn,
  onClickLeaveBtn,
}) {
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
          <button type="button" onClick={onClickLeaveBtn}>
            <Door />
          </button>
        </li>
      </ul>
    </section>
  );
}

export default StudyBar;
