import React, { useState, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { videoState, audioState } from "../../recoil/studyroom_state";
import SettingBar from "../../components/study/setting_bar/setting_bar";
import SettingSection from "../../components/study/setting_section/setting_section";
import styles from "./setting_room.module.css";

function SettingRoom({ goToStudyRoom }) {
  const videoRef = useRef();
  const setIsPlaying = useSetRecoilState(videoState);
  const setIsMuted = useSetRecoilState(audioState);
  const [clickedSettingBtn, setClickedSettingBtn] = useState(false);
  const displayType = clickedSettingBtn === true ? styles.hide : styles.show;

  useEffect(() => {
    const getVideoandAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      videoRef.current.srcObject = stream;

      const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled; // enabled 초기값: true
    };
    getVideoandAudio();
  }, []);

  const stopOrStartVideo = () => {
    const myStream = videoRef.current.srcObject;
    const videoTrack = myStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsPlaying((prev) => !prev);
  };

  const stopOrStartAudio = () => {
    const myStream = videoRef.current.srcObject;
    const audioTrack = myStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted((prev) => !prev);
  };

  const clickSettingBtn = () => {
    setClickedSettingBtn((prev) => !prev);
  };

  return (
    <div className={styles.room}>
      {clickedSettingBtn && (
        <SettingSection //
          clickSettingBtn={clickSettingBtn}
        />
      )}
      <section className={`${styles.video_component} ${displayType}`}>
        <video className={styles.video} ref={videoRef} autoPlay />
      </section>
      <div className={`${styles.bar} ${displayType}`}>
        <SettingBar //
          goToStudyRoom={goToStudyRoom}
          stopOrStartVideo={stopOrStartVideo}
          stopOrStartAudio={stopOrStartAudio}
          clickSettingBtn={clickSettingBtn}
        />
      </div>
    </div>
  );
}

export default SettingRoom;
