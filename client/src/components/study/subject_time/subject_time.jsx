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
import styles from "./subject_time.module.css";
import { ReactComponent as Play } from "../../../assets/icons/play-fill.svg";
import { ReactComponent as Pause } from "../../../assets/icons/pause-fill.svg";
import { ReactComponent as GoalOpen } from "../../../assets/icons/down.svg";

function SubjectTime({ onClickplanBtn }) {
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
    <section className={styles.subject_time}>
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
  );
}

export default SubjectTime;
