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
import useFetch from "@hooks/useFetch";
import getColor from "src/utils/getColor";
import { getTimeDiff, getDday, dateParsing, dateFormatting } from "@utils";
import styles from "./MyPage.module.css";

function MyPage() {
  const { data: profileData, request: refetchProfile } = useFetch(getProfile);
  const { data: myRoomData, request: refetchMyRoom } = useFetch(getMyRoom);
  const [selectedDate, setSelectedDate] = useState(dateFormatting(new Date()));
  const [timeRecordData, setTimeRecordData] = useState();
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const renderModal = (type) => setIsModalOpen(type);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {(isModalOpen === "edit-mygoal" && (
        <MyGoalEditModal profileData={profileData} onClose={closeModal} refetch={refetchProfile} />
      )) ||
        (isModalOpen === "edit-myroom" && (
          <MyRoomEditModal roomData={myRoomData} onClose={closeModal} refetch={refetchMyRoom} />
        )) ||
        (isModalOpen === "edit-nickname" && <NicknameEditModal onClose={closeModal} />) ||
        (isModalOpen === "delete-account" && <AccountDeleteModal onClose={closeModal} />)}
      <Layout>
        <div className={styles.mypage}>
          <aside className={styles.side_nav_bar}>
            <SideNavBar />
          </aside>
          <div className={styles.container}>
            <section className={styles.my_goal}>
              <div className={styles.heading}>
                <div>??? ??????</div>
                <EditButton onClick={() => renderModal("edit-mygoal")} />
              </div>
              <div className={styles.contents}>
                <div>
                  <div className={styles.sub_heading}>?????????</div>
                  <div className={styles.box}>
                    <div className={styles.bold}>
                      {profileData?.dday ? getDday(dateParsing(profileData.dday)) : "D-DAY"}
                    </div>
                    <div>
                      <div>{profileData?.ddayInfo ? profileData.ddayInfo : "????????? ???????????????."}</div>
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
                  <div className={styles.sub_heading}>????????????</div>
                  <div className={styles.box}>
                    <div className={styles.bold}>
                      {profileData?.targetTime ? `${profileData?.targetTime} ??????` : "??? ??????"}
                    </div>
                    <div>/??????</div>
                  </div>
                </div>
                <div className={styles.text_box}>
                  <div className={styles.sub_heading}>??????</div>
                  <div className={styles.text_field}>
                    <Textarea
                      placeholder="?????? ????????? ?????? ??? ?????? ?????? ????????? ???????????????."
                      value={profileData?.goal}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className={styles.study_history}>
              <div className={styles.heading}>?????? ??????</div>
              <div className={styles.contents}>
                <div className={styles.box}>
                  <div className={styles.date_box}>
                    <div className={styles.sub_heading}>??????</div>
                    <div className={styles.content}>
                      <DatePicker onChange={(date) => setSelectedDate(dateFormatting(date))} />
                    </div>
                  </div>
                  <div className={styles.study_time_box}>
                    <div className={styles.sub_heading}>??????</div>
                    <div className={styles.content}>
                      <div className={styles.total_time}>
                        {`${Math.floor(totalStudyTime / 1000 / 60 / 60)}?????? 
                          ${Math.floor((totalStudyTime / 1000 / 60) % 60)}??? 
                          ${Math.floor(totalStudyTime / 1000) % 60}???`}
                      </div>
                      <div className={styles.subject_list}>
                        <TimeRecordList list={timeRecordData} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.sub_heading}>?????????</div>
                  <TimeTable timeRecordList={timeRecordData} />
                </div>
              </div>
            </section>
            <section>
              <div className={styles.heading}>
                <div>?????? ????????????</div>
                {myRoomData && <EditButton onClick={() => renderModal("edit-myroom")} />}
              </div>
              <div className={styles.sub_heading}>????????? ????????????</div>
              <div className={styles.contents}>
                {myRoomData ? <MyRoom roomData={myRoomData} /> : <div className={styles.no_content}>????????????.</div>}
              </div>
            </section>
            <section className={styles.account}>
              <div className={styles.heading}>
                <div>??????</div>
                <EditButton onClick={() => renderModal("edit-nickname")} />
              </div>
              <div className={styles.contents}>
                <div>
                  <div className={styles.sub_heading}>?????????</div>
                  <div className={styles.nickname}>{user.nickname}</div>
                </div>
                <div>
                  <div className={styles.sub_heading}>????????????</div>
                  <button type="button" className={styles.delete_btn} onClick={() => renderModal("delete-account")}>
                    ?????? ??????
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
