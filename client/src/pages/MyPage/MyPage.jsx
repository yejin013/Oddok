import React, { useState, useEffect } from "react";
import { Header, Footer } from "@components/home";
import { SideNavBar, DatePicker, TimeTable, TimeRecordList, MyRoom } from "@components/mypage";
import { Textarea } from "@components/commons";
import { getProfile, getTimeRecordList } from "@api/mypage-api";
import useAsync from "@hooks/useAsync";
import getColor from "src/utils/getColor";
import getTimeDiff from "src/utils/getTimeDiff";
import styles from "./MyPage.module.css";

function MyPage() {
  const { data: profileData } = useAsync(getProfile, { onError: (error) => console.error(error) }, [], false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
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
          <section className={styles.my_room}>
            <div className={styles.heading}>생성 스터디룸</div>
            <div className={styles.sub_heading}>생성한 스터디룸</div>
            <div className={styles.contents}>
              <MyRoom
                roomData={{
                  name: "공시생 1호실",
                  hashtags: ["해시태그1", "해시태그2", "해시태그3"],
                  endAt: "2022-12-31",
                }}
              />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
