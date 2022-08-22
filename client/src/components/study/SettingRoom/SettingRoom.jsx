import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { deviceState } from "@recoil/studyroom-state";
import { planState, selectedPlanState } from "@recoil/plan-state";
import { SettingBar, SettingForm, SettingSideBar, PlanSidebar, UserVideo } from "@components/study";
import { useToggleSideBar, useMyStream } from "@hooks";
import styles from "./SettingRoom.module.css";

function SettingRoom({ goToStudyRoom }) {
  const location = useLocation();
  const path = location.pathname === "/studyroom/create";
  const { videoRef, videoActive, audioActive, toggleVideo, toggleAudio } = useMyStream();
  const { sideBarType, toggleSideBar } = useToggleSideBar();
  const { nickname, updateAllowed } = useRecoilValue(userState);
  const setDeviceStatus = useSetRecoilState(deviceState);
  const [plans, setPlans] = useRecoilState(planState);
  const [selectedPlan, setSelectedplan] = useRecoilState(selectedPlanState);

  useEffect(() => {
    if (plans.length <= 0) return;

    setPlans([]);
    if (selectedPlan) {
      setSelectedplan(null);
    }
  }, []);

  return (
    <div className={styles.layout}>
      <section className={styles.video_section}>
        {sideBarType === "SETTING" && (path ? <SettingForm onClose={toggleSideBar} /> : <SettingSideBar />)}
        <div className={styles.video_container}>
          <UserVideo
            count={1}
            user={{
              streamRef: videoRef,
              isHost: updateAllowed,
              audioActive,
              nickname,
            }}
          />
        </div>
        {sideBarType === "PLAN" && <PlanSidebar />}
      </section>
      <SettingBar
        goToStudyRoom={() => {
          setDeviceStatus({ video: videoActive, audio: audioActive });
          goToStudyRoom();
        }}
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
        clickSideBarBtn={toggleSideBar}
        videoActive={videoActive}
        audioActive={audioActive}
      />
    </div>
  );
}

export default SettingRoom;
