import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user_state";
import { roomInfoState } from "../recoil/studyroom_state";
import { createStudyRoom, joinStudyRoom } from "../api/study-room-api";
import { getTestUser } from "../api/getTestUser";
import SettingRoom from "./settting_room/setting_room";

function CreateRoom() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

  useEffect(() => {
    // 스터디룸을 개설하는 유저에게 방 정보 업데이트 권한을 준다
    setUserInfo({ ...userInfo, updateAllowed: true });

    /* get testUser */
    getTestUser()
      .then((users) => console.log(users))
      .catch((error) => console.log(`get user error!: ${error}`));
  }, []);

  /**
   * 1. 스터디룸 생성 요청 -> id return
   * 2. id로 참여 요청
   */
  const goToStudyRoom = async () => {
    const data = await createStudyRoom(roomInfo);
    localStorage.setItem("roomID", data.id); // TODO 추후 삭제 (방 참여시 사용하기 위함)
    setRoomInfo({ ...roomInfo, id: data.id });
    const token = await joinStudyRoom(data.id);
    history.push({
      pathname: `/studyroom/${data.id}`,
      state: {
        token: token.token,
      },
    });
  };

  return <SettingRoom goToStudyRoom={goToStudyRoom} />;
}

export default CreateRoom;
