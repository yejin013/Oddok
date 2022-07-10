import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { roomIdState, roomInfoState, videoState, audioState } from "@recoil/studyroom-state";
import { userState } from "@recoil/user-state";
import { updateStudyRoom, leaveStudyRoom } from "@api/study-room-api";
import {
  StudyBar,
  UserVideo,
  SettingSideBar,
  ChatSideBar,
  PlanSidebar,
  ParticipantSideBar,
  SettingForm,
} from "@components/study";
import { Modal } from "@components/commons";
import styles from "./StudyRoom.module.css";

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
  const roomId = useRecoilValue(roomIdState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const resetRoomInfo = useResetRecoilState(roomInfoState);
  const [sideBarState, setSideBarState] = useState({
    setting: false,
    chatting: false,
    plan: false,
    participant: false,
  });
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const localUser = useRecoilValue(userState);

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
    publisher.streamManager.publishVideo(!publisher.streamManager.stream.videoActive);
    setIsPlaying((prev) => !prev);
  };

  const toggleAudio = () => {
    publisher.streamManager.publishAudio(!publisher.streamManager.stream.audioActive);
    session.signal({ data: JSON.stringify({ isMicOn: !isMuted }), type: "micStatusChanged" });
    setPublisher({ ...publisher, isMicOn: !publisher.isMicOn });
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
        await session.connect(location.state.token, {
          nickname: localUser.nickname,
          isHost: localUser.updateAllowed,
          isMicOn: isMuted,
        });
        const devices = await OV.getDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        const localUserStream = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: videoDevices[0].label ? videoDevices.deviceId : undefined,
          publishAudio: isMuted,
          publishVideo: isPlaying,
          frameRate: 30,
          mirror: false,
        });
        await session.publish(localUserStream);
        setPublisher({
          streamManager: localUserStream,
          nickname: localUser.nickname,
          isHost: localUser.updateAllowed,
          isMicOn: isMuted,
        });
      })();

      // 3. 소켓 이벤트 처리
      // 1) 스트림 생성
      session.on("streamCreated", (event) => {
        const participant = session.subscribe(event.stream, undefined);
        const data = JSON.parse(event.stream.connection.data);
        setSubscribers((prev) => [
          ...prev,
          { streamManager: participant, nickname: data.nickname, isHost: data.isHost, isMicOn: data.isMicOn },
        ]);
        setCount((prev) => prev + 1);
      });
      // 2) 스트림 삭제
      session.on("streamDestroyed", (event) => {
        setSubscribers((prev) => prev.filter((subscriber) => subscriber.streamManager !== event.stream.streamManager));
        setCount((prev) => prev - 1);
      });
      // 3) 방장이 방 정보를 수정했을 때
      session.on("signal:updated-roominfo", (event) => {
        const data = JSON.parse(event.data);
        setRoomInfo(data);
      });

      session.on("signal:micStatusChanged", (event) => {
        setSubscribers((prev) =>
          prev.map((user) => {
            if (user.streamManager.stream.connection.connectionId === event.from.connectionId) {
              const userStatus = user;
              userStatus.isMicOn = JSON.parse(event.data).isMicOn;
              return userStatus;
            }
            return user;
          }),
        );
      });

      session.on("exception", (exception) => {
        console.warn(exception);
      });
    }
  }, [session]);

  const clickDetailBtn = () => {
    setIsDetailOpen((prev) => !prev);
  };

  const clickSettingBtn = () => {
    setSideBarState({
      ...sideBarState,
      setting: !sideBarState.setting,
      chatting: false,
      plan: false,
      participant: false,
    });
  };

  const clickChatBtn = () => {
    setSideBarState({
      ...sideBarState,
      setting: false,
      chatting: !sideBarState.chatting,
      plan: false,
      participant: false,
    });
  };

  const clickPlanBtn = () => {
    setSideBarState({ ...sideBarState, setting: false, chatting: false, plan: !sideBarState.plan, participant: false });
  };

  const clickParticipantBtn = () => {
    if (!publisher) return;
    setSideBarState({
      ...sideBarState,
      setting: false,
      chatting: false,
      plan: false,
      participant: !sideBarState.participant,
    });
  };

  const updateRoomInfo = async (data) => {
    try {
      const response = await updateStudyRoom(roomId, data);
      session.signal({
        data: JSON.stringify(response),
        to: [],
        type: "updated-roominfo",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.room}>
      <div className={styles.setting}>
        {isDetailOpen && <SettingForm onClose={clickDetailBtn} onUpdate={updateRoomInfo} />}
      </div>
      <div className={styles.video_container}>
        {sideBarState.setting && (
          <div className={styles.side_bar}>
            <SettingSideBar clickDetailBtn={clickDetailBtn} />
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
        {sideBarState.participant && (
          <div className={styles.side_bar}>
            <ParticipantSideBar participants={[publisher, ...subscribers]} />
          </div>
        )}
      </div>
      <div className={styles.bar}>
        <StudyBar
          roomName={roomInfo.name}
          clickSettingBtn={clickSettingBtn}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          isPlaying={isPlaying}
          isMuted={isMuted}
          clickParticipantBtn={clickParticipantBtn}
          clickChatBtn={clickChatBtn}
          onClickplanBtn={clickPlanBtn}
          onClickLeaveBtn={clickLeaveBtn}
        />
      </div>
      {isLeaveOpen && (
        <Modal
          title="스터디 종료"
          content="정말 나가시겠습니까?"
          onClose={() => setIsLeaveOpen(false)}
          onAction={{ text: "나가기", action: leaveRoom }}
        />
      )}
    </div>
  );
}

export default StudyRoom;
