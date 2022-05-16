import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import { useRecoilState, useResetRecoilState } from "recoil";
import { roomInfoState, videoState, audioState } from "@recoil/studyroom_state";
import { leaveStudyRoom } from "@api/study-room-api";
import { StudyBar, UserVideo, SettingSideBar, ChatSideBar, PlanSidebar, SettingSection } from "@components/study";
import { ErrorModal } from "@components/commons";
import styles from "./study_room.module.css";

function StudyRoom() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const OV = new OpenVidu();
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(1);
  const [isPlaying, setIsPlaying] = useRecoilState(videoState);
  const [isMuted, setIsMuted] = useRecoilState(audioState);
  const isStudyRoom = true; // studyroom에 입장했을 때만 생기는 UI를 위한 변수
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const resetRoomInfo = useResetRecoilState(roomInfoState);
  const [sideBarState, setSideBarState] = useState({ setting: false, chatting: false, plan: false });
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  const clickLeaveBtn = () => {
    setIsLeaveOpen(true);
  };

  const leaveRoom = async () => {
    await leaveStudyRoom(id);
    await session.disconnect();
    resetRoomInfo();
    history.push({
      pathname: "/",
    });
  };

  const toggleVideo = () => {
    publisher.publishVideo(!publisher.stream.videoActive);
    setIsPlaying((prev) => !prev);
  };

  const toggleAudio = () => {
    publisher.publishAudio(!publisher.stream.audioActive);
    setIsMuted((prev) => !prev);
  };

  // 1. 유저 세션 생성
  useEffect(() => {
    if (!location.state) {
      history.push(`/studyroom/${id}/setting`);
    }
    setSession(OV.initSession());
  }, []);

  // 2. 방 세션과 유저 세션 연결
  useEffect(() => {
    if (session) {
      (async () => {
        await session.connect(location.state.token);
        const devices = await OV.getDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        const localUser = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: videoDevices[0].label ? videoDevices.deviceId : undefined,
          publishAudio: isMuted,
          publishVideo: isPlaying,
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
        setSubscribers((prev) => prev.filter((subscriber) => subscriber !== event.stream.streamManager));
        setCount((prev) => prev - 1);
      });
      session.on("exception", (exception) => {
        console.warn(exception);
      });
      // 3) 방장이 방 정보를 수정했을 때
      session.on("signal:updated-roominfo", (event) => {
        console.log("데이터 잘 왔엉🙂👋");
        const data = JSON.parse(event.data);
        setRoomInfo(data);
      });
    }
  }, [session]);

  const clickDetailBtn = () => {
    setIsDetailOpen((prev) => !prev);
  };

  const clickSettingBtn = () => {
    setSideBarState({ ...sideBarState, setting: !sideBarState.setting, chatting: false, plan: false });
  };

  const clickChatBtn = () => {
    setSideBarState({ ...sideBarState, setting: false, chatting: !sideBarState.chatting, plan: false });
  };

  const clickPlanBtn = () => {
    setSideBarState({ ...sideBarState, setting: false, chatting: false, plan: !sideBarState.plan });
  };

  return (
    <div className={styles.room}>
      <div className={styles.setting}>{isDetailOpen && <SettingSection clickSettingBtn={clickDetailBtn} />}</div>
      <div className={styles.video_container}>
        {sideBarState.setting && (
          <div className={styles.side_bar}>
            <SettingSideBar roomInfo={roomInfo} session={session} clickDetailBtn={clickDetailBtn} />
          </div>
        )}
        <ul className={styles.videos}>
          {publisher && <UserVideo count={count} publisher={publisher} />}
          {subscribers && subscribers.map((subscriber) => <UserVideo count={count} subscriber={subscriber} />)}
        </ul>
        {sideBarState.plan && (
          <div className={styles.side_bar}>
            <PlanSidebar isStudyRoom={isStudyRoom} />
          </div>
        )}
        <div className={`${styles.side_bar} ${!sideBarState.chatting && styles.hide}`}>
          <ChatSideBar session={session} />
        </div>
      </div>
      <div className={styles.bar}>
        <StudyBar
          roomName={roomInfo.name}
          clickSettingBtn={clickSettingBtn}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          isPlaying={isPlaying}
          isMuted={isMuted}
          clickChatBtn={clickChatBtn}
          onClickplanBtn={clickPlanBtn}
          onClickLeaveBtn={clickLeaveBtn}
        />
      </div>
      {isLeaveOpen && (
        <ErrorModal
          message="정말 나가시겠습니까?"
          onConfirm={() => setIsLeaveOpen(false)}
          onAction={{ text: "진짜 나가기", action: leaveRoom }}
        />
      )}
    </div>
  );
}

export default StudyRoom;
