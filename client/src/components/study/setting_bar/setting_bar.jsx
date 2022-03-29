import React from "react";
import styles from "./setting_bar.module.css";
import { ReactComponent as Setting } from "../../../assets/icons/setting.svg";
import { ReactComponent as Music } from "../../../assets/icons/music.svg";
import { ReactComponent as VideoOn } from "../../../assets/icons/video.svg";
import { ReactComponent as MicOff } from "../../../assets/icons/mic_off.svg";
import { ReactComponent as GoalOpen } from "../../../assets/icons/down.svg";

function SettingBar({ roomName, goToStudyRoom, stopOrStartVideo, stopOrStartAudio, clickSettingBtn }) {
  return (
    <footer className={styles.bar}>
      <section className={styles.info}>
        <button type="button" onClick={clickSettingBtn}>
          <Setting />
        </button>
        <span>{roomName || "방정보를 설정해주세요"}</span>
        <div className={styles.music}>
          <i className={styles.music_icon}>
            <Music />
          </i>
          <span>없음</span>
        </div>
      </section>
      <section className={styles.goal}>
        <span>목표를 입력해주세요</span>
        <button type="button">
          <GoalOpen />
        </button>
      </section>
      <ul className={styles.buttons}>
        <li className={styles.video_button}>
          <button type="button" onClick={stopOrStartVideo}>
            <VideoOn />
          </button>
        </li>
        <li className={styles.audio_button}>
          <button type="button" onClick={stopOrStartAudio}>
            <MicOff />
          </button>
        </li>
        <li>
          <button type="button" className={styles.start_button} onClick={goToStudyRoom}>
            스터디 시작하기
          </button>
        </li>
      </ul>
    </footer>
  );
}

export default SettingBar;
