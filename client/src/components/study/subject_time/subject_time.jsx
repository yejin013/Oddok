import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedPlanState } from "@recoil/plan_state";
import {
  hourState,
  minuteState,
  secondState,
  totalHourState,
  totalMinuteState,
  totalSecondState,
  startTimeState,
  endTimeState,
} from "@recoil/timer_state";
import { saveTime } from "@api/study-room-api";
import { Play, Pause, GoalOpen } from "@icons";
import styles from "./subject_time.module.css";

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
    startTime,
    endTime,
    subject: selectedPlan.name,
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

  useEffect(() => {
    if (endTime != null) {
      saveTime(timeInfo)
        .then(() => console.log("시간저장 완료⏱️"))
        .catch((error) => console.log(`post time-record error!: ${error}`));
    }
  }, [endTime]);

  const getStartTime = () => {
    setStartTime(new Date());
    setIsRecorded((prev) => !prev);
  };

  const getEndTime = () => {
    setEndTime(new Date());
    setIsRecorded((prev) => !prev);
  };

  return (
    <section className={styles.subject_time}>
      {!isRecorded ? (
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
          <span>{selectedPlan.name || "목표를 입력해주세요"}</span>
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
