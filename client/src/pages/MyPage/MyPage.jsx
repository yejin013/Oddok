import React, { useState, useEffect } from "react";
import { Header, Footer } from "@components/home";
import { SideNavBar, DatePicker, TimeTable, TimeRecordList } from "@components/mypage";
import { Textarea } from "@components/commons";
import { getProfile, getTimeRecordList } from "@api/mypage-api";
import useAsync from "@hooks/useAsync";
import getColor from "src/utils/getColor";
import getTimeDiff from "src/utils/getTimeDiff";
import styles from "./MyPage.module.css";

// const TIME_RECORD_DATA = [
//   {
//     startTime: new Date("2022-05-16T05:30:11"),
//     endTime: new Date("2022-05-16T06:43:11"),
//     subject: "과목1",
//   },
//   {
//     startTime: new Date("2022-05-14T07:23:11"),
//     endTime: new Date("2022-05-14T11:10:11"),
//     subject: "과목2",
//   },
//   {
//     startTime: new Date("2022-05-14T11:10:11"),
//     endTime: new Date("2022-05-14T13:00:11"),
//     subject: "과목3",
//   },
//   {
//     startTime: new Date("2022-05-14T14:12:11"),
//     endTime: new Date("2022-05-14T15:35:11"),
//     subject: "과목4",
//   },
//   {
//     startTime: new Date("2022-05-14T15:36:11"),
//     endTime: new Date("2022-05-14T17:11:11"),
//     subject: "과목5",
//   },
//   {
//     startTime: new Date("2022-05-14T17:13:11"),
//     endTime: new Date("2022-05-14T18:10:11"),
//     subject: "과목6",
//   },
//   {
//     startTime: new Date("2022-05-14T20:00:11"),
//     endTime: new Date("2022-05-14T21:10:11"),
//     subject: "과목7",
//   },
//   {
//     startTime: new Date("2022-05-14T22:00:11"),
//     endTime: new Date("2022-05-14T23:00:11"),
//     subject: "과목8",
//   },
// ];

function MyPage() {
  const { data: profileData } = useAsync(getProfile, { onError: (error) => console.error(error) }, [], false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeRecordData, setTimeRecordData] = useState();
  const [totalStudyTime, setTotalStudyTime] = useState();

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
                  <div className={styles.bold}>
                    {profileData?.dday
                      ? `D - ${Math.floor((new Date(profileData.dday) - new Date()) / 1000 / 60 / 60 / 24)}`
                      : "D - DAY"}
                  </div>
                  <div>
                    <div>{profileData?.ddayInfo ? profileData.ddayInfo : "날짜를 추가하세요."}</div>
                    <div>
                      {profileData?.dday
                        ? `${new Date(profileData.dday).getFullYear()}. ${
                            new Date(profileData.dday).getMonth() + 1
                          }. ${new Date(profileData.dday).getDate()}`
                        : "0000. 00. 00"}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.sub_heading}>공부시간</div>
                <div className={styles.my_goal_box}>
                  <div className={styles.bold}>
                    {profileData?.targetTime ? `${profileData?.targetTime} 시간` : "몇 시간"}
                  </div>
                  <div>/하루</div>
                </div>
              </div>
              <div className={styles.text_box}>
                <div className={styles.sub_heading}>목표</div>
                <div className={styles.text_field}>
                  <Textarea
                    placeholder="수정 버튼을 눌러 내 목표 또는 각오를 적어주세요."
                    defaultValue={profileData?.goal}
                    disabled
                  />
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
                    <DatePicker setSelectedDate={setSelectedDate} />
                  </div>
                </div>
                <div className={styles.study_time_box}>
                  <div className={styles.sub_heading}>과목</div>
                  <div className={styles.content}>
                    <div className={styles.total_time}>
                      {`${Math.floor(totalStudyTime / 1000 / 60 / 60)}시간 
                      ${Math.floor((totalStudyTime / 1000 / 60) % 60)}분 
                      ${(totalStudyTime / 1000) % 60}초`}
                    </div>
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
