import React from "react";
import styles from "./setting_bar.module.css";
import { ReactComponent as Setting } from "../../../assets/icons/setting.svg";
import { ReactComponent as Music } from "../../../assets/icons/music.svg";
import { ReactComponent as VideoOn } from "../../../assets/icons/video.svg";
import { ReactComponent as MicOff } from "../../../assets/icons/mic_off.svg";
import { ReactComponent as GoalOpen } from "../../../assets/icons/down.svg";

function SettingBar({ roomName, goToStudyRoom, stopOrStartVideo, stopOrStartAudio, clickSettingBtn, onClickplanBtn }) {
  return (
    <section className={styles.bar}>
      <div className={styles.info}>
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
      </div>
      <div className={styles.goal}>
        <span>목표를 입력해주세요</span>
        <button type="button" onClick={onClickplanBtn}>
          <GoalOpen />
        </button>
      </div>
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
          <button type="button" className={styles.start_button} onClick={goToStudyRoom} disabled={!roomName}>
            스터디 시작하기
          </button>
        </li>
      </ul>
    </section>
  );
}

export default SettingBar;
