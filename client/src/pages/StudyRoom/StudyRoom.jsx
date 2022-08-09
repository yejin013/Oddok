import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { roomInfoState, deviceState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import { userState } from "@recoil/user-state";
import { updateStudyRoom, leaveStudyRoom } from "@api/study-room-api";
import { initSession, connectToSession, connectDevice, publishStream } from "@api/openvidu-api";
import { StudyBar, UserVideo, SettingSideBar, ChatSideBar, PlanSidebar, ParticipantSideBar } from "@components/study";
import { Modal } from "@components/commons";
import { useToggleSideBar } from "@hooks";
import styles from "./StudyRoom.module.css";

function StudyRoom() {
  const history = useHistory();
  const { roomId } = useParams();
  const [session, setSession] = useState(initSession());
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(1);
  const [deviceStatus, setDeviceStatus] = useRecoilState(deviceState);
  const isStudyRoom = true; // studyroom에 입장했을 때만 생기는 UI를 위한 변수
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const resetRoomInfo = useResetRecoilState(roomInfoState);
  const { sideBarType, toggleSideBar } = useToggleSideBar();
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const localUser = useRecoilValue(userState);
  const setError = useSetRecoilState(errorState);

  const clickLeaveBtn = () => {
    setIsLeaveOpen(true);
  };

  const leaveRoom = async () => {
    await leaveStudyRoom(roomId);
    session.disconnect();
    resetRoomInfo();
    history.push({
      pathname: "/",
    });
  };

  const toggleVideo = () => {
    publisher.stream.publishVideo(!publisher.stream.stream.videoActive);
    setDeviceStatus((prev) => ({ ...prev, cam: !prev.cam }));
  };

  const toggleAudio = () => {
    publisher.stream.publishAudio(!publisher.stream.stream.audioActive);
    session.signal({ data: JSON.stringify({ isMicOn: !deviceStatus.mic }), type: "micStatusChanged" });
    setPublisher({ ...publisher, isMicOn: !publisher.isMicOn });
    setDeviceStatus((prev) => ({ ...prev, mic: !prev.mic }));
  };

  const startOpenvidu = async () => {
    await connectToSession(
      session,
      history.location.state.token,
      {
        nickname: localUser.nickname,
        isHost: localUser.updateAllowed,
        isMicOn: deviceStatus.mic,
      },
      roomId,
    );
    const userStream = await connectDevice(deviceStatus);
    setPublisher({
      stream: userStream,
      nickname: localUser.nickname,
      isHost: localUser.isHost,
      isMic: deviceStatus.mic,
    });
    await publishStream(session, userStream);
  };

  useEffect(() => {
    if (!history.location.state) {
      history.push(`/studyroom/${roomId}/setting`);
    }
    startOpenvidu().catch((error) => setError(error));
  }, []);

  useEffect(() => {
    // 1) 스트림 생성
    session.on("streamCreated", (event) => {
      const participant = session.subscribe(event.stream, undefined);
      const data = JSON.parse(event.stream.connection.data);
      setSubscribers((prev) => [
        ...prev,
        { stream: participant, nickname: data.nickname, isHost: data.isHost, isMicOn: data.isMicOn },
      ]);
      setCount((prev) => prev + 1);
    });
    // 2) 스트림 삭제
    session.on("streamDestroyed", (event) => {
      setSubscribers((prev) => prev.filter((subscriber) => subscriber.stream !== event.stream.streamManager));
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
          if (user.stream.stream.connection.connectionId === event.from.connectionId) {
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
  }, []);

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
      <div className={styles.video_container}>
        {sideBarType === "SETTING" && <SettingSideBar updateRoomInfo={updateRoomInfo} />}
        <ul className={styles.videos}>
          {publisher && <UserVideo count={count} user={publisher} />}
          {subscribers?.map((subscriber) => (
            <UserVideo count={count} user={subscriber} />
          ))}
        </ul>
        {sideBarType === "PLAN" && <PlanSidebar isStudyRoom={isStudyRoom} />}
        {sideBarType === "PARTICIPANT" && (
          <ParticipantSideBar participants={publisher ? [publisher, ...subscribers] : []} />
        )}
        <ChatSideBar session={session} display={sideBarType === "CHATTING"} />
      </div>
      <div className={styles.bar}>
        <StudyBar
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          isPlaying={deviceStatus.cam}
          isMuted={deviceStatus.mic}
          clickSideBarBtn={toggleSideBar}
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
