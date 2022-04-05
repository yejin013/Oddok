import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import { useRecoilState, useSetRecoilState } from "recoil";
import { roomInfoState } from "../../recoil/studyroom_state";
import StudyBar from "../../components/study/study_bar/study_bar";
import UserVideo from "../../components/study/user_video/user_video";
import SideBar from "../../components/study/side_bar/side_bar";
import ChatBar from "../../components/study/chat_bar/chat_bar";
import styles from "./study_room.module.css";

function StudyRoom() {
  const history = useHistory();
  const location = useLocation();
  const OV = new OpenVidu();
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(1);

  const [isSettingOpen, setIsSettingOpen] = useState(false); // 사이드바 토글하기 위한 state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

  const leaveRoom = () => {
    session.disconnect();
    setSubscribers([]);
    setCount(1);
    history.push({
      pathname: "/",
    });
  };

  const deleteSubscriber = (streamManager) => {
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
    }
    setCount((prev) => prev - 1);
  };

  const toggleVideo = () => {
    publisher.publishVideo(!publisher.stream.videoActive);
  };

  const toggleAudio = () => {
    publisher.publishAudio(!publisher.stream.audioActive);
  };

  // 1. 유저 세션 생성
  useEffect(() => {
    console.log("roominfo🙂", roomInfo);
    setSession(OV.initSession());
  }, []);

  // 2. 방 세션과 유저 세션 연결
  useEffect(() => {
    if (session) {
      (async () => {
        console.log("🙂", location.state.token);
        await session.connect(location.state.token);
        const devices = await OV.getDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        const localUser = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: videoDevices[0].label ? videoDevices.deviceId : undefined,
          publishAudio: true,
          publishVideo: true,
          frameRate: 30,
          mirror: false,
        });
        await session.publish(localUser);
        setPublisher(localUser);
      })();

      // 3. 소켓 이벤트 처리
      // 1) 스트림 생성
      session.on("streamCreated", (event) => {
        const participant = session.subscribe(event.stream, undefined);
        setSubscribers((prev) => [...prev, participant]);
        setCount((prev) => prev + 1);
      });
      // 2) 스트림 삭제
      session.on("streamDestroyed", (event) => {
        deleteSubscriber(event.stream.streamManager);
      });
      session.on("exception", (exception) => {
        console.warn(exception);
      });
      // 3) 방장이 방 정보를 수정했을 때
      session.on("signal:updated-roominfo", (event) => {
        console.log("데이터 잘 왔엉🙂👋");
        const res = JSON.parse(event.data);
        setRoomInfo(res);
      });
    }
  }, [session]);

  const clickSettingBtn = () => {
    setIsSettingOpen((prev) => !prev);
  };

  const clickChatBtn = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className={styles.room}>
      <div className={styles.video_container}>
        <ul className={styles.videos}>
          {publisher && <UserVideo count={count} streamManager={publisher} />}
          {subscribers && subscribers.map((subscriber) => <UserVideo count={count} streamManager={subscriber} />)}
        </ul>
      </div>
      <div className={styles.bar}>
        <StudyBar
          roomName={roomInfo.name}
          clickSettingBtn={clickSettingBtn}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          clickChatBtn={clickChatBtn}
          leaveRoom={leaveRoom}
        />
      </div>
      {isSettingOpen && <SideBar roomInfo={roomInfo} session={session} />}
      <ChatBar session={session} isChatOpen={isChatOpen} />
    </div>
  );
}

export default StudyRoom;
