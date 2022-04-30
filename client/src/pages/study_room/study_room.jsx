import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import { useRecoilState, useResetRecoilState } from "recoil";
import { roomInfoState } from "../../recoil/studyroom_state";
import { leaveStudyRoom } from "../../api/study-room-api";
import StudyBar from "../../components/study/study_bar/study_bar";
import UserVideo from "../../components/study/user_video/user_video";
import SettingSideBar from "../../components/study/setting_side_bar/setting_side_bar";
import ChatBar from "../../components/study/chat_bar/chat_bar";
import PlanSidebar from "../../components/study/plan_sidebar/plan_sidebar";
import SettingSection from "../../components/study/setting_section/setting_section";
import ErrorModal from "../../components/commons/ErrorModal/ErrorModal";
import styles from "./study_room.module.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SETTING":
      return { setting: !state.setting, chatting: false, plan: false };
    case "TOGGLE_CHATTING":
      return { setting: false, chatting: !state.chatting, plan: false };
    case "TOGGLE_PLAN":
      return { setting: false, chatting: false, plan: !state.plan };
    default:
      return { setting: false, chatting: false, plan: false };
  }
};

function StudyRoom() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const OV = new OpenVidu();
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(1);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const resetRoomInfo = useResetRecoilState(roomInfoState);
  const [sideBarState, dispatch] = useReducer(reducer, { setting: false, chatting: false, plan: false });
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSidebar, setisSidebar] = useState(false);
  const displayType = isSidebar ? styles.decrease : "";
  const isStudyRoom = true;
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  const clickLeaveBtn = () => {
    setIsLeaveOpen(true);
  };

  const leaveRoom = async () => {
    await leaveStudyRoom(id);
    await session.disconnect();
    resetRoomInfo();
    // setSubscribers([]);
    // setCount(1);
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
        const data = JSON.parse(event.data);
        setRoomInfo(data);
      });
    }
  }, [session]);

  const clickDetailBtn = () => {
    setIsDetailOpen((prev) => !prev);
  };

  const clickSettingBtn = () => {
    dispatch({ type: "TOGGLE_SETTING" });
  };

  const clickChatBtn = () => {
    dispatch({ type: "TOGGLE_CHATTING" });
  };

  const clickPlanBtn = () => {
    dispatch({ type: "TOGGLE_PLAN" });
  };

  return (
    <div className={styles.room}>
      <div className={styles.setting}>{isDetailOpen && <SettingSection clickSettingBtn={clickDetailBtn} />}</div>
      <div className={styles.video_container}>
        {sideBarState.setting && (
          <SettingSideBar roomInfo={roomInfo} session={session} clickDetailBtn={clickDetailBtn} />
        )}
        <ul className={`${styles.videos} ${displayType}`}>
          {publisher && <UserVideo count={count} publisher={publisher} />}
          {subscribers && subscribers.map((subscriber) => <UserVideo count={count} subscriber={subscriber} />)}
        </ul>
        {sideBarState.plan && (
          <div className={styles.plan_bar}>
            <PlanSidebar isStudyRoom={isStudyRoom} />
          </div>
        )}
        <ChatBar session={session} isChatOpen={sideBarState.chatting} />
      </div>
      <div className={styles.bar}>
        <StudyBar
          roomName={roomInfo.name}
          clickSettingBtn={clickSettingBtn}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          clickChatBtn={clickChatBtn}
          onClickplanBtn={clickPlanBtn}
          onClickLeaveBtn={clickLeaveBtn}
          leaveRoom={leaveRoom}
        />
      </div>
      {isLeaveOpen && (
        <ErrorModal
          message="정말 나가시겠습니까?"
          onConfirm={() => setIsLeaveOpen(false)}
          onAction={{ handleAction: () => leaveRoom(), action: "진짜 나가기" }}
        />
      )}
    </div>
  );
}

export default StudyRoom;
