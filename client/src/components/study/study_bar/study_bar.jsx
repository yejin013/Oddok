import React from "react";
import { useRecoilState } from "recoil";
import { selectedPlanState } from "../../../recoil/plan_state";
import styles from "./study_bar.module.css";
import { ReactComponent as Setting } from "../../../assets/icons/setting.svg";
import { ReactComponent as Music } from "../../../assets/icons/music.svg";
import { ReactComponent as Play } from "../../../assets/icons/play-fill.svg";
import { ReactComponent as Pause } from "../../../assets/icons/pause-fill.svg";
import { ReactComponent as GoalOpen } from "../../../assets/icons/down.svg";
import { ReactComponent as VideoOn } from "../../../assets/icons/video.svg";
import { ReactComponent as MicOff } from "../../../assets/icons/mic_off.svg";
import { ReactComponent as Chat } from "../../../assets/icons/chat.svg";
import { ReactComponent as Member } from "../../../assets/icons/person.svg";
import { ReactComponent as Door } from "../../../assets/icons/door.svg";

function StudyBar({ toggleVideo, toggleAudio, leaveRoom, isRecorded, getStartTime, getEndTime }) {
  const [selectedPlan, setSelectedplan] = useRecoilState(selectedPlanState);

  return (
    <footer className={styles.bar}>
      <section className={styles.info}>
        <button type="button">
          <Setting />
        </button>
        <span>자격증 3호실</span>
        <div className={styles.music}>
          <i className={styles.music_icon}>
            <Music />
          </i>
          <span>소녀시대 - 힘내!</span>
        </div>
      </section>
      <section className={styles.goal}>
        {isRecorded === false ? (
          <button type="button" className={styles.play_button} onClick={getStartTime}>
            <Play />
          </button>
        ) : (
          <button type="button" className={styles.pause_button} onClick={getEndTime}>
            <Pause />
          </button>
        )}
        <span>{selectedPlan.name}</span>
        <button type="button">
          <GoalOpen />
        </button>
      </section>
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
          <button type="button">
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
    </footer>
  );
}

export default StudyBar;
