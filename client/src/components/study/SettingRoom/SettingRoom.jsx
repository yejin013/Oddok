import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { videoState, audioState } from "@recoil/studyroom-state";
import { SettingBar, SettingForm, SettingSideBar, TotalTime, PlanSidebar, UserTag } from "@components/study";
import styles from "./SettingRoom.module.css";

function SettingRoom({ goToStudyRoom, updateRoomInfo }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useRecoilState(videoState);
  const [isMuted, setIsMuted] = useRecoilState(audioState);
  const [clickedSettingBtn, setClickedSettingBtn] = useState(false);
  const userInfo = useRecoilValue(userState);
  const [isPlanOpen, setisPlanOpen] = useState(false);

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
    setClickedSettingBtn((prev) => !prev);
  };

  const clickPlanBtn = () => {
    setisPlanOpen((prev) => !prev);
  };

  return (
    <div className={styles.room}>
      <div className={styles.video_container}>
        {clickedSettingBtn &&
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
        {isPlanOpen && <PlanSidebar />}
      </div>
      <SettingBar
        goToStudyRoom={goToStudyRoom}
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
        clickSettingBtn={clickSettingBtn}
        onClickplanBtn={clickPlanBtn}
        isPlaying={isPlaying}
        isMuted={isMuted}
      />
    </div>
  );
}

export default SettingRoom;
