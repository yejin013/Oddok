import React from "react";
import { useHistory } from "react-router-dom";
import { createToken } from "../api/studyRoomAPI";
import SettingRoom from "./settting_room/setting_room";

function JoinRoom() {
  const history = useHistory();

  const goToStudyRoom = async () => {
    const roomId = 4; // 임의로 지정
    const userId = 2;
    const token = await createToken(userId, roomId);
    history.push({
      pathname: `/studyroom/${roomId}`,
      state: {
        token: token.data.token,
      },
    });
  };

  return <SettingRoom goToStudyRoom={goToStudyRoom} />;
}

export default JoinRoom;
