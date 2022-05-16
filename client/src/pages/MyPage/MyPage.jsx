import React, { useState, useEffect } from "react";
import { Header, Footer } from "@components/home";
import { SideNavBar, DatePicker, TimeTable, TimeRecordList } from "@components/mypage";
import { Textarea } from "@components/commons";
import getColor from "src/utils/getColor";
import getTimeDiff from "src/utils/getTimeDiff";
import styles from "./MyPage.module.css";

const TIME_RECORD_DATA = [
  {
    startTime: new Date("2022-05-16T05:30:11"),
    endTime: new Date("2022-05-16T06:43:11"),
    subject: "과목1",
  },
  {
    startTime: new Date("2022-05-14T07:23:11"),
    endTime: new Date("2022-05-14T11:10:11"),
    subject: "과목2",
  },
  {
    startTime: new Date("2022-05-14T11:10:11"),
    endTime: new Date("2022-05-14T13:00:11"),
    subject: "과목3",
  },
  {
    startTime: new Date("2022-05-14T14:12:11"),
    endTime: new Date("2022-05-14T15:35:11"),
    subject: "과목4",
  },
  {
    startTime: new Date("2022-05-14T15:36:11"),
    endTime: new Date("2022-05-14T17:11:11"),
    subject: "과목5",
  },
  {
    startTime: new Date("2022-05-14T17:13:11"),
    endTime: new Date("2022-05-14T18:10:11"),
    subject: "과목6",
  },
  {
    startTime: new Date("2022-05-14T20:00:11"),
    endTime: new Date("2022-05-14T21:10:11"),
    subject: "과목7",
  },
  {
    startTime: new Date("2022-05-14T22:00:11"),
    endTime: new Date("2022-05-14T23:00:11"),
    subject: "과목8",
  },
];

function MyPage() {
  const [timeRecordData, setTimeRecordData] = useState();
  useEffect(() => {
    let sum = 0;
    const newArray = TIME_RECORD_DATA.map((data, i) => {
      sum += getTimeDiff(data.startTime, data.endTime);
      return {
        ...data,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        color: getColor(i),
        studyTime: getTimeDiff(data.startTime, data.endTime),
      };
    });
    setTimeRecordData(newArray);
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.mypage}>
        <aside className={styles.side_nav_bar}>
          <SideNavBar />
        </aside>
        <div className={styles.container}>
          <section className={styles.my_goal}>
            <div className={styles.heading}>내 목표</div>
            <div className={styles.contents}>
              <div>
                <div className={styles.sub_heading}>디데이</div>
                <div className={styles.my_goal_box}>
                  <div className={styles.bold}>D - DAY</div>
                  <div>
                    <div>날짜를 추가하세요.</div>
                    <div>0000.00.00</div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.sub_heading}>공부시간</div>
                <div className={styles.my_goal_box}>
                  <div className={styles.bold}>몇 시간</div>
                  <div>/하루</div>
                </div>
              </div>
              <div className={styles.text_box}>
                <div className={styles.sub_heading}>목표</div>
                <div>
                  <Textarea placeholder="수정 버튼을 눌러 내 목표 또는 각오를 적어주세요." disabled />
                </div>
              </div>
            </div>
          </section>
          <section className={styles.study_history}>
            <div className={styles.heading}>공부 기록</div>
            <div className={styles.contents}>
              <div className={styles.box}>
                <div className={styles.date_box}>
                  <div className={styles.sub_heading}>날짜</div>
                  <div className={styles.content}>
                    <DatePicker />
                  </div>
                </div>
                <div className={styles.study_time_box}>
                  <div className={styles.sub_heading}>과목</div>
                  <div className={styles.content}>
                    <div className={styles.total_time}>00시간 00분 00초</div>
                    <div className={styles.subject_list}>
                      <TimeRecordList list={timeRecordData} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.timetable}>
                <div className={styles.sub_heading}>시간표</div>
                <TimeTable timeRecordList={timeRecordData} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
