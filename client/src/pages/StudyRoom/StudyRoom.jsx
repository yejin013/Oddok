import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { roomInfoState, deviceState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import { planState, selectedPlanState } from "@recoil/plan-state";
import {
  hourState,
  minuteState,
  secondState,
  totalHourState,
  totalMinuteState,
  totalSecondState,
  studyTimeState,
} from "@recoil/timer-state";
import { leaveStudyRoom } from "@api/study-room-api";
import { initSession, connectToSession, connectDevice, initPublisher } from "@api/openvidu-api";
import { StudyBar, UserVideo, SettingSideBar, ChatSideBar, PlanSidebar, ParticipantSideBar } from "@components/study";
import { Modal } from "@components/commons";
import { useToggleSideBar, useManageLocalUser, useManageRemoteUsers } from "@hooks";
import useModal from "@hooks/useModal";
import styles from "./StudyRoom.module.css";

function StudyRoom() {
  const history = useHistory();
  const { roomId } = useParams();
  const [session, setSession] = useState(initSession());
  const { localUser, setLocalUser, videoActive, audioActive, toggleVideo, toggleAudio } = useManageLocalUser();
  const { remoteUsers, onRemoteStreamCreated, onRemoteStreamDestroyed, onRemoteMicStatusChanged } =
    useManageRemoteUsers();
  const participants = localUser ? [localUser, ...remoteUsers] : [];
  const [deviceStatus, setDeviceStatus] = useRecoilState(deviceState);
  const setRoomInfo = useSetRecoilState(roomInfoState);
  const resetRoomInfo = useResetRecoilState(roomInfoState);
  const resetHour = useResetRecoilState(hourState);
  const resetMinute = useResetRecoilState(minuteState);
  const resetSecond = useResetRecoilState(secondState);
  const resetTotalHour = useResetRecoilState(totalHourState);
  const resetTotalMinute = useResetRecoilState(totalMinuteState);
  const resetTotalSecond = useResetRecoilState(totalSecondState);
  const resetStudyTime = useResetRecoilState(studyTimeState);
  const resetPlan = useResetRecoilState(planState);
  const resetSelectedPlan = useResetRecoilState(selectedPlanState);
  const { sideBarType, toggleSideBar } = useToggleSideBar();
  const { isModal: isLeaveModal, openModal: openLeaveModal, closeModal } = useModal();
  const setError = useSetRecoilState(errorState);

  const resetState = () => {
    resetRoomInfo();
    resetHour();
    resetMinute();
    resetSecond();
    resetTotalHour();
    resetTotalMinute();
    resetTotalSecond();
    resetStudyTime();
    resetPlan();
    resetSelectedPlan();
  };

  const leaveRoom = async () => {
    await leaveStudyRoom(roomId);
    session.disconnect();
    resetState();
    history.replace("/");
  };

  const goToSharePage = async () => {
    await leaveStudyRoom(roomId);
    session.disconnect();
    resetState();
    history.replace("/share/study-time");
  };

  const startOpenvidu = async () => {
    const [_, deviceId] = await Promise.all([
      connectToSession(session, history.location.state.token, localUser, roomId),
      connectDevice(deviceStatus),
    ]);
    const stream = await initPublisher(deviceId, deviceStatus);
    session.publish(stream);
    setLocalUser((prev) => ({ ...prev, stream, audioActive }));
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
    if (localUser.stream) session.signal({ data: JSON.stringify({ audioActive }), type: "micStatusChanged" });
  }, [audioActive]);

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
        {sideBarType === "PLAN" && <PlanSidebar />}
        {sideBarType === "PARTICIPANT" && <ParticipantSideBar participants={participants} />}
        <ChatSideBar session={session} display={sideBarType === "CHATTING"} />
      </section>
      <StudyBar
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
        videoActive={videoActive}
        audioActive={audioActive}
        clickSideBarBtn={toggleSideBar}
        onClickLeaveBtn={openLeaveModal}
      />
      {isLeaveModal && (
        <Modal
          title="스터디 종료"
          content="정말 스터디방을 나가시겠습니까?"
          onClose={closeModal}
          onSubAction={{ text: "보지 않고 나가기", action: leaveRoom }}
          onAction={{ text: "시간표 확인", action: goToSharePage }}
        />
      )}
    </div>
  );
}

export default StudyRoom;
