import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../recoil/user_state";
import { roomInfoState } from "../recoil/studyroom_state";
import { joinStudyRoom } from "../api/studyroomAPI";
import SettingRoom from "./settting_room/setting_room";

import { createToken } from "./testserver";

function JoinRoom() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const roomInfo = useRecoilValue(roomInfoState);

  useEffect(() => {
    // TODO 방장 아이디와 일치할 경우 수정 권한 주기
    // ✅ 나중에 방 리스트에서 받아온 방 정보의 방장아이디 이용!
    setUserInfo({ ...userInfo, updateAllowed: false });
  }, []);

  // TODO 나중에 방 리스트에서 받아온 방 정보로 대체하기 (아톰에 저장하는 과정도 필요)
  // const goToStudyRoom = async () => {
  //   const token = await joinStudyRoom(roomInfo.id);
  //   history.push({
  //     pathname: `/studyroom/${roomInfo.id}`,
  //     state: {
  //       token: token.token,
  //       roomInfo,
  //     },
  //   });
  // };

  const goToStudyRoom = async () => {
    const sessionId = localStorage.getItem("sessionId");

    const token = await createToken(sessionId);
    history.push({
      pathname: `/studyroom/${sessionId}`,
      state: {
        token: token.data.token,
        roomInfo,
      },
    });
  };

  return <SettingRoom goToStudyRoom={goToStudyRoom} />;
}

export default JoinRoom;
