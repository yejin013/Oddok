import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@recoil/user_state";
import { videoState, audioState, roomInfoState, roomTitleState } from "@recoil/studyroom_state";
import { planState } from "@recoil/plan_state";
import { ToolTip } from "@components/commons";
import { SettingBar, SettingSection, SettingSideBar, TotalTime, PlanSidebar } from "@components/study";
import styles from "./setting_room.module.css";

function SettingRoom({ goToStudyRoom }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useRecoilState(videoState);
  const [isMuted, setIsMuted] = useRecoilState(audioState);
  const [clickedSettingBtn, setClickedSettingBtn] = useState(false);
  const userInfo = useRecoilValue(userState);
  const roomInfo = useRecoilValue(roomInfoState);
  const roomTitle = useRecoilValue(roomTitleState);
  const [isPlanOpen, setisPlanOpen] = useState(false);
  const plan = useRecoilValue(planState);
  const displayType = clickedSettingBtn ? styles.hide : "";

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
    <div>
      {clickedSettingBtn &&
        (userInfo.updateAllowed ? <SettingSection clickSettingBtn={clickSettingBtn} /> : <SettingSideBar />)}
      <div className={`${styles.room} ${displayType}`}>
        <section className={styles.video_component}>
          <div className={styles.video_container}>
            <video className={styles.video} ref={videoRef} autoPlay />
            <TotalTime />
          </div>
          {isPlanOpen && (
            <div className={styles.plan_bar}>
              <PlanSidebar />
            </div>
          )}
        </section>
        <div className={styles.bar}>
          {!roomInfo.category && (
            <div className={styles.setting_tooltip}>
              <ToolTip type="left" message="해시태그나 스터디 유형 설정은 여기에서!" />
            </div>
          )}
          {plan.length === 0 && (
            <div className={styles.plan_tooltip}>
              <ToolTip message="오늘의 스터디 플랜을 적어볼까요?⏱️" />
            </div>
          )}
          <SettingBar
            title={roomInfo.name || roomTitle || "방정보를 입력해주세요"}
            goToStudyRoom={goToStudyRoom}
            toggleVideo={toggleVideo}
            toggleAudio={toggleAudio}
            clickSettingBtn={clickSettingBtn}
            onClickplanBtn={clickPlanBtn}
            isPlaying={isPlaying}
            isMuted={isMuted}
          />
        </div>
      </div>
    </div>
  );
}

export default SettingRoom;
