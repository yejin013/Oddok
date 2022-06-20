import React from "react";
import { useRecoilValue } from "recoil";
import { selectedPlanState } from "@recoil/plan-state";
import { Setting, Music, VideoOn, VideoOff, MicOn, MicOff, GoalOpen } from "@icons";
import styles from "./SettingBar.module.css";

function SettingBar({
  title,
  goToStudyRoom,
  toggleVideo,
  toggleAudio,
  clickSettingBtn,
  onClickplanBtn,
  isPlaying,
  isMuted,
}) {
  const selectedPlan = useRecoilValue(selectedPlanState);

  return (
    <section className={styles.bar}>
      <div className={styles.info}>
        <button type="button" onClick={clickSettingBtn}>
          <Setting />
        </button>
        <span>{title}</span>
        <div className={styles.music}>
          <i className={styles.music_icon}>
            <Music />
          </i>
          <span>없음</span>
        </div>
      </div>
      <div className={styles.goal}>
        <span>{selectedPlan.name || "목표를 입력해주세요"}</span>
        <button type="button" onClick={onClickplanBtn}>
          <GoalOpen />
        </button>
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
        <li>
          <button type="button" className={styles.start_button} onClick={goToStudyRoom} disabled={!title}>
            스터디 시작하기
          </button>
        </li>
      </ul>
    </section>
  );
}

export default SettingBar;
