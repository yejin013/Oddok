import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedPlanState } from "../../../recoil/plan_state";
import {
  hourState,
  minuteState,
  secondState,
  totalHourState,
  totalMinuteState,
  totalSecondState,
  startTimeState,
  endTimeState,
} from "../../../recoil/timer_state";
import { saveTime } from "../../../api/studyRoomAPI";
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

function StudyBar({ toggleVideo, toggleAudio, leaveRoom, onClickplanBtn }) {
  const [isRecorded, setIsRecorded] = useState(false);

  const selectedPlan = useRecoilValue(selectedPlanState);
  const [startTime, setStartTime] = useRecoilState(startTimeState);
  const [endTime, setEndTime] = useRecoilState(endTimeState);

  const [hour, setHour] = useRecoilState(hourState);
  const [minute, setMinute] = useRecoilState(minuteState);
  const [second, setSecond] = useRecoilState(secondState);

  const [totalHour, setTotalHour] = useRecoilState(totalHourState);
  const [totalMinute, setTotalMinute] = useRecoilState(totalMinuteState);
  const [totalSecond, setTotalSecond] = useRecoilState(totalSecondState);

  const timeInfo = {
    userId: 1, // 나중에 userId로 바꾸기
    subject: selectedPlan.name,
    startTime,
    endTime,
  };

  useEffect(() => {
    let timer;
    if (isRecorded) {
      timer = setInterval(() => {
        /* *목표별 공부시간* */
        if (minute > 59) {
          setHour((prev) => prev + 1);
          setMinute(0);
        }
        if (second === 59) {
          setMinute((prev) => prev + 1);
          setSecond(0);
        }
        if (second < 59) {
          setSecond((prev) => prev + 1);
        }
        /* *전체 공부시간* */
        if (totalMinute > 59) {
          setTotalHour((prev) => prev + 1);
          setTotalMinute(0);
        }
        if (totalSecond === 59) {
          setTotalMinute((prev) => prev + 1);
          setTotalSecond(0);
        }
        if (totalSecond < 59) {
          setTotalSecond((prev) => prev + 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  });

  const getStartTime = () => {
    const time = new Date();
    setStartTime(time);
    setIsRecorded((prev) => !prev);
  };

  const getEndTime = () => {
    const time = new Date();
    setEndTime(time);
    setIsRecorded((prev) => !prev);
    /* server에 timeInfo post */
    saveTime(timeInfo)
      .then((res) => console.log("시간저장 완료⏱️"))
      .catch((error) => console.log(`post time-record error!: ${error}`));
  };

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
        <div className={styles.plan}>
          <div>
            <span>{selectedPlan.name}</span>
            <button type="button" onClick={onClickplanBtn}>
              <GoalOpen />
            </button>
          </div>
          <div>
            <span>{hour < 10 ? `0${hour}` : hour}</span>&nbsp;:&nbsp;
            <span>{minute < 10 ? `0${minute}` : minute}</span>&nbsp;:&nbsp;
            <span>{second < 10 ? `0${second}` : second}</span>
          </div>
        </div>
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
