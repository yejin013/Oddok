import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getTestUser } from "../api/getUser";
import { createSession, createToken } from "../api/studyRoomAPI";
import SettingRoom from "./settting_room/setting_room";

function CreateRoom() {
  const history = useHistory();

  /* get testUser */
  useEffect(() => {
    getTestUser()
      .then((users) => console.log(users))
      .catch((error) => console.log(`get user error!: ${error}`));
  }, []);

  const goToStudyRoom = async () => {
    const roomInfo = "RoomS2"; // 나중에 설정 화면에서 저장된 방 정보로 대체
    const userId = 1;
    const roomId = await createSession(userId, roomInfo);
    const token = await createToken(userId, roomId.data.id);
    history.push({
      pathname: `/studyroom/${roomId.data.id}`,
      state: {
        token: token.data.token,
      },
    });
  };

  return <SettingRoom goToStudyRoom={goToStudyRoom} />;
}

export default CreateRoom;
