import React from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { deviceState } from "@recoil/studyroom-state";
import { SettingBar, SettingForm, SettingSideBar, PlanSidebar, UserVideo } from "@components/study";
import { useToggleSideBar } from "@hooks";
import useMyStream from "./useMyStream";
import styles from "./SettingRoom.module.css";

function SettingRoom({ goToStudyRoom }) {
  const location = useLocation();
  const path = location.pathname === "/studyroom/create";
  const { videoRef, videoActive, audioActive, toggleVideo, toggleAudio } = useMyStream();
  const { sideBarType, toggleSideBar } = useToggleSideBar();
  const { updateAllowed, nickname } = useRecoilValue(userState);
  const setDeviceStatus = useSetRecoilState(deviceState);

  return (
    <div className={styles.layout}>
      <section className={styles.video_section}>
        {sideBarType === "SETTING" && (path ? <SettingForm onClose={() => toggleSideBar()} /> : <SettingSideBar />)}
        <div className={styles.video_container}>
          <UserVideo
            count={1}
            user={{
              streamRef: videoRef,
              isHost: updateAllowed,
              isMicOn: audioActive,
              nickname,
            }}
          />
        </div>
        {sideBarType === "PLAN" && <PlanSidebar />}
      </section>
      <SettingBar
        goToStudyRoom={() => {
          setDeviceStatus({ cam: videoActive, mic: audioActive });
          goToStudyRoom();
        }}
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
        clickSideBarBtn={toggleSideBar}
        isPlaying={videoActive}
        isMuted={audioActive}
      />
    </div>
  );
}

export default SettingRoom;
