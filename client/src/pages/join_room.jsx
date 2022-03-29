import React from "react";
import { useHistory } from "react-router-dom";
import { createToken } from "./testserver";
// import { createToken } from "../api/createToken";

import SettingRoom from "./settting_room/setting_room";

function JoinRoom() {
  const history = useHistory();

  const goToStudyRoom = async () => {
    const sessionId = localStorage.getItem("sessionId"); // 나중에 받아온 방 정보로 대체

    const token = await createToken(sessionId);
    history.push({
      pathname: `/studyroom/${sessionId}`,
      state: {
        token: token.data.token,
      },
    });
  };

  return <SettingRoom goToStudyRoom={goToStudyRoom} />;
}

export default JoinRoom;
