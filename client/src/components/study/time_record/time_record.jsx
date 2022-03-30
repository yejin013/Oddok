import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { totalHourState, totalMinuteState, totalSecondState } from "../../../recoil/timer_state";
import styles from "./time_record.module.css";

function TimeRecord(props) {
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

export default TimeRecord;
