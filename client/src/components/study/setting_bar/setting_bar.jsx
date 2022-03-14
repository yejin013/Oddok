import React from "react";
import styles from "./setting_bar.module.css";
import { ReactComponent as Setting } from "../../../assets/icons/setting.svg";
import { ReactComponent as Video } from "../../../assets/icons/video.svg";
import { ReactComponent as MicOff } from "../../../assets/icons/mic_off.svg";
import { ReactComponent as GoalOpen } from "../../../assets/icons/down.svg";

function SettingBar({ goToStudyRoom, stopOrStartVideo, stopOrStartAudio, selectSettingBtn }) {
  return (
    <footer className={styles.bar}>
      <section className={styles.info}>
        <button type="button" onClick={selectSettingBtn}>
          <Setting />
        </button>
        <span>일반 3호실</span>
        <span>🎵없음</span>
      </section>
      <section className={styles.goal}>
        <span>목표를 입력해주세요</span>
        <button type="button">
          <GoalOpen />
        </button>
      </section>
      <ul className={styles.list}>
        <li className={styles.video_button}>
          <button type="button" onClick={stopOrStartVideo}>
            <Video />
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
