import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { totalHourState, totalMinuteState, totalSecondState } from "../../../recoil/timer_state";
import styles from "./time_record.module.css";

function TimeRecord({ session }) {
  // const totalHour = useRecoilValue(totalHourState);
  // const totalMinute = useRecoilValue(totalMinuteState);
  // const totalSecond = useRecoilValue(totalSecondState);
  const [second, setSecond] = useState(0);

  /* *signal 전송되면 확인* */
  useEffect(() => {
    if (session) {
      session.on("signal:totalTime", (event) => {
        console.log(`receive time signal! ${event.data}`);
        setSecond(event.data);
      });
    }
  });

  return (
    <div className={styles.time}>
      <section>
        <span>{second < 10 ? `0${second}` : second}</span>
      </section>
    </div>
  );
}

export default TimeRecord;

/*
<span>{totalHour < 10 ? `0${totalHour}` : totalHour}</span>&nbsp;:&nbsp;
<span>{totalMinute < 10 ? `0${totalMinute}` : totalMinute}</span>&nbsp;:&nbsp;
*/
