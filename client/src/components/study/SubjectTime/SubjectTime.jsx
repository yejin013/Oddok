import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedPlanState } from "@recoil/plan-state";
import {
  hourState,
  minuteState,
  secondState,
  totalHourState,
  totalMinuteState,
  totalSecondState,
  studyTimeState,
} from "@recoil/timer-state";
import { saveTime } from "@api/time-record-api";
import { Play, Pause, GoalOpen } from "@icons";
import styles from "./SubjectTime.module.css";

function SubjectTime({ onPlanBtnClick }) {
  const [isRecording, setIsRecording] = useState(false);
  const selectedPlan = useRecoilValue(selectedPlanState);
  const [hour, setHour] = useRecoilState(hourState);
  const [minute, setMinute] = useRecoilState(minuteState);
  const [second, setSecond] = useRecoilState(secondState);
  const [totalHour, setTotalHour] = useRecoilState(totalHourState);
  const [totalMinute, setTotalMinute] = useRecoilState(totalMinuteState);
  const [totalSecond, setTotalSecond] = useRecoilState(totalSecondState);
  const [studyTime, setStudyTime] = useRecoilState(studyTimeState);

  const timeInfo = {
    startTime: studyTime.start,
    endTime: studyTime.end,
    subject: selectedPlan?.name,
  };

  useEffect(() => {
    let timer;
    if (isRecording) {
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
    if (studyTime.end !== null) {
      saveTime(timeInfo).catch((error) => console.log(error));
    }
  }, [studyTime.end]);

  // 선택한 목표의 시간 기록 중, 다른 목표를 선택하면 기록 중지
  useEffect(() => {
    if (!isRecording) {
      return;
    }
    setIsRecording(false);
  }, [selectedPlan]);

  const saveStartTime = () => {
    setStudyTime({ ...studyTime, start: new Date() });
    setIsRecording(true);
  };

  const saveEndTime = () => {
    setStudyTime({ ...studyTime, end: new Date() });
    setIsRecording(false);
  };

  return (
    <section className={styles.subject_time}>
      {!isRecording ? (
        <button type="button" className={styles.play_button} onClick={saveStartTime}>
          <Play />
        </button>
      ) : (
        <button type="button" className={styles.pause_button} onClick={saveEndTime}>
          <Pause />
        </button>
      )}
      <div className={styles.plan}>
        <div>
          <span>{selectedPlan?.name ?? "목표를 입력해주세요"}</span>
          <button type="button" onClick={onPlanBtnClick}>
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
