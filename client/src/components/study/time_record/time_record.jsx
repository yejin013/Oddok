import React from "react";
import { useRecoilValue } from "recoil";
import { totalHourState, totalMinuteState, totalSecondState } from "../../../recoil/timer_state";
import styles from "./time_record.module.css";

function TimeRecord(props) {
  const totalHour = useRecoilValue(totalHourState);
  const totalMinute = useRecoilValue(totalMinuteState);
  const totalSecond = useRecoilValue(totalSecondState);

  /* *signal 전송되면 확인* */
  // useEffect(() => {
  //   if (session) {
  //     session.on("signal:totalTime", (event) => {
  //       console.log(event.data);
  //       console.log("시간받음!");
  //     });
  //   }
  // });

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
