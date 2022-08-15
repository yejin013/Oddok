import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { getProfile, getTimeRecordList, getMyRoom } from "@api/mypage-api";
import {
  SideNavBar,
  DatePicker,
  TimeTable,
  TimeRecordList,
  MyRoom,
  EditButton,
  MyGoalEditModal,
  MyRoomEditModal,
  AccountDeleteModal,
} from "@components/mypage";
import { Textarea, NicknameEditModal } from "@components/commons";
import { Layout } from "@components/layout";
import { getColor, getTimeDiff, getDday, dateParsing, dateFormatting } from "@utils";
import { useAsync, useModal } from "@hooks";
import styles from "./MyPage.module.css";

function MyPage() {
  const { data: profileData, request: refetchProfile } = useAsync({ requestFn: getProfile, skip: false });
  const { data: myRoomData, request: refetchMyRoom } = useAsync({ requestFn: getMyRoom, skip: false });
  const [selectedDate, setSelectedDate] = useState(dateFormatting(new Date()));
  const [timeRecordData, setTimeRecordData] = useState();
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const { isModal, openModal, closeModal } = useModal();
  const user = useRecoilValue(userState);

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

  const renderModal = (type) => openModal(type);

  return (
    <div>
      {(isModal === "edit-mygoal" && (
        <MyGoalEditModal profileData={profileData} onClose={closeModal} refetch={refetchProfile} />
      )) ||
        (isModal === "edit-myroom" && (
          <MyRoomEditModal roomData={myRoomData} onClose={closeModal} refetch={refetchMyRoom} />
        )) ||
        (isModal === "edit-nickname" && <NicknameEditModal onClose={closeModal} />) ||
        (isModal === "delete-account" && <AccountDeleteModal onClose={closeModal} />)}
      <Layout>
        <div className={styles.mypage}>
          <aside className={styles.side_nav_bar}>
            <SideNavBar />
          </aside>
          <div className={styles.container}>
            <section className={styles.my_goal}>
              <div className={styles.heading}>
                <div>내 목표</div>
                <EditButton onClick={() => renderModal("edit-mygoal")} />
              </div>
              <div className={styles.contents}>
                <div>
                  <div className={styles.sub_heading}>디데이</div>
                  <div className={styles.box}>
                    <div className={styles.bold}>
                      {profileData?.dday ? getDday(dateParsing(profileData.dday)) : "D-DAY"}
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
                  <div className={styles.box}>
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
                      value={profileData?.goal}
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
                      <DatePicker onChange={(date) => setSelectedDate(dateFormatting(date))} />
                    </div>
                  </div>
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
                <div>
                  <div className={styles.sub_heading}>시간표</div>
                  <TimeTable timeRecordList={timeRecordData} />
                </div>
              </div>
            </section>
            <section>
              <div className={styles.heading}>
                <div>생성 스터디룸</div>
                {myRoomData && <EditButton onClick={() => renderModal("edit-myroom")} />}
              </div>
              <div className={styles.sub_heading}>생성한 스터디룸</div>
              <div className={styles.contents}>
                {myRoomData ? <MyRoom roomData={myRoomData} /> : <div className={styles.no_content}>없습니다.</div>}
              </div>
            </section>
            <section className={styles.account}>
              <div className={styles.heading}>
                <div>계정</div>
                <EditButton onClick={() => renderModal("edit-nickname")} />
              </div>
              <div className={styles.contents}>
                <div>
                  <div className={styles.sub_heading}>닉네임</div>
                  <div className={styles.nickname}>{user.nickname}</div>
                </div>
                <div>
                  <div className={styles.sub_heading}>위험구역</div>
                  <button type="button" className={styles.delete_btn} onClick={() => renderModal("delete-account")}>
                    계정 삭제
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default MyPage;
