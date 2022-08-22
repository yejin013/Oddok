import React from "react";
import { useRecoilValue } from "recoil";
import { totalHourState, totalMinuteState, totalSecondState } from "@recoil/timer-state";
import styles from "./TotalTime.module.css";

function TotalTime() {
  const totalHour = useRecoilValue(totalHourState);
  const totalMinute = useRecoilValue(totalMinuteState);
  const totalSecond = useRecoilValue(totalSecondState);

  return (
    <div className={styles.time}>
      <span>{totalHour < 10 ? `0${totalHour}` : totalHour}</span>&nbsp;:&nbsp;
      <span>{totalMinute < 10 ? `0${totalMinute}` : totalMinute}</span>&nbsp;:&nbsp;
      <span>{totalSecond < 10 ? `0${totalSecond}` : totalSecond}</span>
    </div>
  );
}

export default TotalTime;
