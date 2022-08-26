import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTimeRecordList } from "@api/mypage-api";
import { DatePicker, TimeRecordList, TimeTable } from "@components/mypage";
import { getColor, getTimeDiff, dateFormatting } from "@utils";
import styles from "./StudyTime.module.css";

function StudyTime() {
  const location = useLocation();
  const isSharePage = location.pathname === "/share/study-time";
  const [selectedDate, setSelectedDate] = useState(dateFormatting(new Date()));
  const [timeRecordData, setTimeRecordData] = useState();
  const [totalStudyTime, setTotalStudyTime] = useState(0);

  const fetchTimeRecordData = async (date) => {
    const response = await getTimeRecordList(date);
    let total = 0;
    const array = response.map((data, i) => {
      const diff = new Date(data.endTime) - new Date(data.startTime);
      total += diff;
      return {
        ...data,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        color: getColor(i),
        studyTime: getTimeDiff(new Date(data.startTime), new Date(data.endTime)),
      };
    });
    setTimeRecordData(array);
    setTotalStudyTime(total);
  };

  useEffect(() => {
    try {
      fetchTimeRecordData(selectedDate);
    } catch (error) {
      console.error(error);
    }
  }, [selectedDate]);

  return (
    <section className={styles.study_history}>
      <div className={styles.heading}>공부 기록</div>
      <div className={styles.contents}>
        <div className={`${styles.box} ${isSharePage && styles.share}`}>
          {!isSharePage && (
            <div className={styles.date_box}>
              <div className={styles.sub_heading}>날짜</div>
              <div className={styles.content}>
                <DatePicker onChange={(date) => setSelectedDate(dateFormatting(date))} />
              </div>
            </div>
          )}
          <div className={styles.study_time_box}>
            <div className={styles.sub_heading}>과목</div>
            <div className={styles.content}>
              <div className={styles.total_time}>
                {`${Math.floor(totalStudyTime / 1000 / 60 / 60)}시간 
                  ${Math.floor((totalStudyTime / 1000 / 60) % 60)}분 
                  ${Math.floor(totalStudyTime / 1000) % 60}초`}
              </div>
              <div className={styles.subject_list}>
                <TimeRecordList list={timeRecordData} />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.time_table} ${isSharePage && styles.share}`}>
          <div className={styles.sub_heading}>시간표</div>
          <TimeTable timeRecordList={timeRecordData} />
        </div>
      </div>
    </section>
  );
}

export default StudyTime;
