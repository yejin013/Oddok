import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { roomInfoState, deviceState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import { leaveStudyRoom } from "@api/study-room-api";
import { initSession, connectToSession, connectDevice, initPublisher } from "@api/openvidu-api";
import { StudyBar, UserVideo, SettingSideBar, ChatSideBar, PlanSidebar, ParticipantSideBar } from "@components/study";
import { Modal } from "@components/commons";
import { useToggleSideBar } from "@hooks";
import useManageLocalUser from "./useManageLocalUser";
import useManageRemoteUsers from "./useManageRemoteUsers";
import styles from "./StudyRoom.module.css";

function StudyRoom() {
  const history = useHistory();
  const { roomId } = useParams();
  const [session, setSession] = useState(initSession());
  const { localUser, setLocalUser, videoActive, audioActive, toggleVideo, toggleAudio } = useManageLocalUser();
  const { remoteUsers, onRemoteStreamCreated, onRemoteStreamDestroyed, onRemoteMicStatusChanged } =
    useManageRemoteUsers();
  const [deviceStatus, setDeviceStatus] = useRecoilState(deviceState);
  const isStudyRoom = true; // studyroom에 입장했을 때만 생기는 UI를 위한 변수
  const setRoomInfo = useSetRecoilState(roomInfoState);
  const resetRoomInfo = useResetRecoilState(roomInfoState);
  const { sideBarType, toggleSideBar } = useToggleSideBar();
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const setError = useSetRecoilState(errorState);

  const leaveRoom = async () => {
    await leaveStudyRoom(roomId);
    session.disconnect();
    resetRoomInfo();
    history.push({
      pathname: "/",
    });
  };

  const startOpenvidu = async () => {
    const [_, deviceId] = await Promise.all([
      connectToSession(session, history.location.state.token, localUser, roomId),
      connectDevice(deviceStatus),
    ]);
    const stream = await initPublisher(deviceId, deviceStatus);
    session.publish(stream);
    setLocalUser((prev) => ({ ...prev, stream, isMicOn: audioActive }));
  };

  useEffect(() => {
    if (!history.location.state) {
      history.push(`/studyroom/${roomId}/setting`);
    }
    startOpenvidu().catch((error) => setError(error));
  }, []);

  useEffect(() => {
    session.on("streamCreated", (event) => {
      const userStream = session.subscribe(event.stream, undefined);
      onRemoteStreamCreated(event, userStream);
    });

    session.on("streamDestroyed", (event) => {
      onRemoteStreamDestroyed(event);
    });

    session.on("signal:roomDataUpdated", (event) => {
      setRoomInfo(JSON.parse(event.data));
    });

    session.on("signal:micStatusChanged", (event) => {
      const { from, data } = event;
      onRemoteMicStatusChanged(from, data);
    });

    session.on("exception", (exception) => {
      console.warn(exception);
    });
  }, []);

  useEffect(() => {
    if (localUser.stream) {
      session.signal({ data: JSON.stringify({ isMicOn: audioActive }), type: "micStatusChanged" });
    }
  }, [audioActive]);

  const participants = localUser ? [localUser, ...remoteUsers] : [];

  return (
    <div className={styles.layout}>
      <section className={styles.video_section}>
        {sideBarType === "SETTING" && <SettingSideBar session={session} />}
        <ul className={styles.videos_container}>
          {localUser.stream && <UserVideo count={participants.length} user={localUser} />}
          {remoteUsers.map((remoteUser) => (
            <UserVideo count={participants.length} user={remoteUser} />
          ))}
        </ul>
        {sideBarType === "PLAN" && <PlanSidebar isStudyRoom={isStudyRoom} />}
        {sideBarType === "PARTICIPANT" && <ParticipantSideBar participants={participants} />}
        <ChatSideBar session={session} display={sideBarType === "CHATTING"} />
      </section>
      <StudyBar
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
        isPlaying={videoActive}
        isMuted={audioActive}
        clickSideBarBtn={toggleSideBar}
        onClickLeaveBtn={() => setIsLeaveOpen(true)}
      />
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
