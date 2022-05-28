import React from "react";
import { useRecoilValue } from "recoil";
import { totalHourState, totalMinuteState, totalSecondState } from "@recoil/timer-state";
import styles from "./TotalTime.module.css";

function TotalTime(props) {
  const totalHour = useRecoilValue(totalHourState);
  const totalMinute = useRecoilValue(totalMinuteState);
  const totalSecond = useRecoilValue(totalSecondState);

  return (
    <div className={styles.time}>
      <section>
        <span>{totalHour < 10 ? `0${totalHour}` : totalHour}</span>&nbsp;:&nbsp;
        <span>{totalMinute < 10 ? `0${totalMinute}` : totalMinute}</span>&nbsp;:&nbsp;
        <span>{totalSecond < 10 ? `0${totalSecond}` : totalSecond}</span>
      </section>
    </div>
  );
}

export default TotalTime;
