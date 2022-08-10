import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { deviceState } from "@recoil/studyroom-state";
import { SettingBar, SettingForm, SettingSideBar, PlanSidebar, UserVideo } from "@components/study";
import { useToggleSideBar } from "@hooks";
import styles from "./SettingRoom.module.css";

function SettingRoom({ goToStudyRoom }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const { sideBarType, toggleSideBar } = useToggleSideBar();
  const setDeviceStatus = useSetRecoilState(deviceState);
  const userInfo = useRecoilValue(userState);
  const location = useLocation();
  const path = location.pathname === "/studyroom/create";

  useEffect(() => {
    const getVideoandAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      videoRef.current.srcObject = stream;
      const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled; // enabled 초기값: true
      window.localStream = stream;
    };
    getVideoandAudio();
    return () => {
      window.localStream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  useEffect(() => {
    setDeviceStatus({ cam: isPlaying, mic: isMuted });
  }, [isPlaying, isMuted]);

  const toggleVideo = () => {
    const myStream = videoRef.current.srcObject;
    const videoTrack = myStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsPlaying((prev) => !prev);
  };

  const toggleAudio = () => {
    const myStream = videoRef.current.srcObject;
    const audioTrack = myStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted((prev) => !prev);
  };

  return (
    <div className={styles.room}>
      <div className={styles.video_container}>
        {sideBarType === "SETTING" && (path ? <SettingForm onClose={() => toggleSideBar()} /> : <SettingSideBar />)}
        <div className={styles.video_wrapper}>
          <UserVideo
            count={1}
            user={{
              streamRef: videoRef,
              isHost: userInfo.updateAllowed,
              isMicOn: isMuted,
              nickname: userInfo.nickname,
            }}
          />
        </div>
        {sideBarType === "PLAN" && <PlanSidebar />}
      </div>
      <SettingBar
        goToStudyRoom={goToStudyRoom}
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
        clickSideBarBtn={toggleSideBar}
        isPlaying={isPlaying}
        isMuted={isMuted}
      />
    </div>
  );
}

export default SettingRoom;
