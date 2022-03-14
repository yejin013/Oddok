import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import SettingBar from "../../components/study/setting_bar/setting_bar";
import SettingSection from "../../components/study/setting_section/setting_section";
import styles from "./setting_room.module.css";

function SettingRoom(props) {
  const videoRef = useRef();
  const history = useHistory();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // 음소거
  const [clickedSettingBtn, setClickedSettingBtn] = useState(false);
  const displayType = clickedSettingBtn === true ? styles.hide : styles.show;

  const goToStudyRoom = () => {
    history.push({
      pathname: "/study-room/:id",
      state: {
        isPlaying,
        isMuted,
      },
    });
  };

  const getVideoandAudio = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    videoRef.current.srcObject = stream;

    const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled; // enabled 초기값: true
  };

  useEffect(() => {
    getVideoandAudio();
  }, []);

  const stopOrStartVideo = () => {
    const myStream = videoRef.current.srcObject;
    const videoTrack = myStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsPlaying(!isPlaying);
  };

  const stopOrStartAudio = () => {
    const myStream = videoRef.current.srcObject;
    const audioTrack = myStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!isMuted);
  };

  const clickSettingBtn = () => {
    setClickedSettingBtn(!clickedSettingBtn);
  };

  return (
    <div className={styles.room}>
      {clickedSettingBtn === true && (
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
