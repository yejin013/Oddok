import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { hourState, minuteState, secondState } from "../../../recoil/timer_state";
import styles from "./time_record.module.css";

function TimeRecord(props) {
  const [hour, setHour] = useRecoilState(hourState);
  const [minute, setMinute] = useRecoilState(minuteState);
  const [second, setSecond] = useRecoilState(secondState);

  return (
    <div className={styles.time}>
      <section>
        <span>{hour < 10 ? `0${hour}` : hour}</span>&nbsp;:&nbsp;
        <span>{minute < 10 ? `0${minute}` : minute}</span>&nbsp;:&nbsp;
        <span>{second < 10 ? `0${second}` : second}</span>
      </section>
    </div>
  );
}

export default TimeRecord;
