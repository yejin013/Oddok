import React from "react";
import { useHistory } from "react-router-dom";
import { createSession, createToken } from "./testserver";
// import { createSession } from "../api/createSession";
// import { createToken } from "../api/createToken";
import SettingRoom from "./settting_room/setting_room";

function CreateRoom() {
  const history = useHistory();

  const goToStudyRoom = async () => {
    const roomInfo = "RoomS2"; // 나중에 설정 화면에서 저장된 방 정보로 대체
    const roomId = await createSession(roomInfo);
    const token = await createToken(roomId.data.sessionId);
    history.push({
      pathname: `/studyroom/${roomId.data.sessionId}`,
      state: {
        token: token.data.token,
      },
    });
  };

  return <SettingRoom goToStudyRoom={goToStudyRoom} />;
}

export default CreateRoom;
