import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { roomInfoState, deviceState } from "@recoil/studyroom-state";
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
  const { roomId } = useParams();
  const OV = new OpenVidu();
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(1);
  const [deviceStatus, setDeviceStatus] = useRecoilState(deviceState);
  const isStudyRoom = true; // studyroom에 입장했을 때만 생기는 UI를 위한 변수
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
    await leaveStudyRoom(roomId);
    await session.disconnect();
    resetRoomInfo();
    history.push({
      pathname: "/",
    });
  };

  const toggleVideo = () => {
    publisher.streamManager.publishVideo(!publisher.streamManager.stream.videoActive);
    setDeviceStatus((prev) => ({ ...prev, cam: !prev.cam }));
  };

  const toggleAudio = () => {
    publisher.streamManager.publishAudio(!publisher.streamManager.stream.audioActive);
    session.signal({ data: JSON.stringify({ isMicOn: !deviceStatus.mic }), type: "micStatusChanged" });
    setPublisher({ ...publisher, isMicOn: !publisher.isMicOn });
    setDeviceStatus((prev) => ({ ...prev, mic: !prev.mic }));
  };

  // 1. 유저 세션 생성
  useEffect(() => {
    if (!history.location.state) {
      history.push(`/studyroom/${roomId}/setting`);
    }
    setSession(OV.initSession());
  }, []);

  // 2. 방 세션과 유저 세션 연결
  useEffect(() => {
    if (session) {
      (async () => {
        await session.connect(history.location.state.token, {
          nickname: localUser.nickname,
          isHost: localUser.updateAllowed,
          isMicOn: deviceStatus.mic,
        });
        const devices = await OV.getDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        const localUserStream = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: videoDevices[0].label ? videoDevices.deviceId : undefined,
          publishAudio: deviceStatus.mic,
          publishVideo: deviceStatus.cam,
          frameRate: 30,
          mirror: false,
        });
        await session.publish(localUserStream);
        setPublisher({
          streamManager: localUserStream,
          nickname: localUser.nickname,
          isHost: localUser.updateAllowed,
          isMicOn: deviceStatus.mic,
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
    setSideBarState((prev) => ({
      setting: !prev.setting,
      chatting: false,
      plan: false,
      participant: false,
    }));
  };

  const clickChatBtn = () => {
    setSideBarState((prev) => ({
      setting: false,
      chatting: !prev.chatting,
      plan: false,
      participant: false,
    }));
  };

  const clickPlanBtn = () => {
    setSideBarState((prev) => ({ setting: false, chatting: false, plan: !prev.plan, participant: false }));
  };

  const clickParticipantBtn = () => {
    if (!publisher) return;
    setSideBarState((prev) => ({
      setting: false,
      chatting: false,
      plan: false,
      participant: !prev.participant,
    }));
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
      {isDetailOpen && <SettingForm onClose={clickDetailBtn} onUpdate={updateRoomInfo} />}
      <div className={styles.video_container}>
        {sideBarState.setting && <SettingSideBar clickDetailBtn={clickDetailBtn} />}
        <ul className={styles.videos}>
          {publisher && <UserVideo count={count} publisher={publisher} />}
          {subscribers && subscribers.map((subscriber) => <UserVideo count={count} subscriber={subscriber} />)}
        </ul>
        {sideBarState.plan && <PlanSidebar isStudyRoom={isStudyRoom} />}
        {sideBarState.participant && <ParticipantSideBar participants={[publisher, ...subscribers]} />}
        <ChatSideBar session={session} display={sideBarState.chatting} />
      </div>
      <div className={styles.bar}>
        <StudyBar
          roomName={roomInfo.name}
          clickSettingBtn={clickSettingBtn}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          isPlaying={deviceStatus.cam}
          isMuted={deviceStatus.mic}
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
