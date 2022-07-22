import React, { useState, useEffect, useRef } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { deviceState } from "@recoil/studyroom-state";
import { SettingBar, SettingForm, SettingSideBar, TotalTime, PlanSidebar, UserTag } from "@components/study";
import styles from "./SettingRoom.module.css";

function SettingRoom({ goToStudyRoom, updateRoomInfo }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const setDeviceStatus = useSetRecoilState(deviceState);
  const [sideBarState, setSideBarState] = useState({ setting: false, plan: false });
  const userInfo = useRecoilValue(userState);

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

  const clickSettingBtn = () => {
    setSideBarState((prev) => ({ ...prev, setting: !prev.setting, plan: false }));
  };

  const clickPlanBtn = () => {
    setSideBarState((prev) => ({ ...prev, plan: !prev.plan, setting: false }));
  };

  return (
    <div className={styles.room}>
      <div className={styles.video_container}>
        {sideBarState.setting &&
          (userInfo.updateAllowed ? (
            <SettingForm onClose={clickSettingBtn} onUpdate={updateRoomInfo} />
          ) : (
            <SettingSideBar />
          ))}
        <div className={styles.video_wrapper}>
          <video ref={videoRef} autoPlay />
          <TotalTime />
          <UserTag isHost={userInfo.updateAllowed} isMicOn={isMuted} nickname={userInfo.nickname} />
        </div>
        {sideBarState.plan && <PlanSidebar />}
      </div>
      <SettingBar
        goToStudyRoom={goToStudyRoom}
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
        onClickSettingBtn={clickSettingBtn}
        onClickplanBtn={clickPlanBtn}
        isPlaying={isPlaying}
        isMuted={isMuted}
      />
    </div>
  );
}

export default SettingRoom;
