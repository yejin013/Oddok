import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../recoil/user_state";
import { roomInfoState } from "../recoil/studyroom_state";
import { getStudyRoom, joinStudyRoom } from "../api/studyroomAPI";
import SettingRoom from "./settting_room/setting_room";

import { createToken } from "./testserver";

function JoinRoom() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

  useEffect(() => {
    const roomID = localStorage.getItem("roomID");
    getStudyRoom(roomID).then((data) => {
      console.log(data);
      setRoomInfo(data);
    });

    // TODO 방장 아이디와 일치할 경우 수정 권한 주기
    // ✅ 방 정보의 방장아이디 이용!
    setUserInfo({ ...userInfo, updateAllowed: false });
  }, []);

  const goToStudyRoom = async () => {
    // TODO roomInfo.id로 바꾸기
    const roomID = localStorage.getItem("roomID");
    const token = await joinStudyRoom(roomID);
    history.push({
      pathname: `/studyroom/${roomID}`,
      state: {
        token: token.token,
      },
    });
  };

  // const goToStudyRoom = async () => {
  //   const sessionId = localStorage.getItem("sessionId");

  //   const token = await createToken(sessionId);
  //   history.push({
  //     pathname: `/studyroom/${sessionId}`,
  //     state: {
  //       token: token.data.token,
  //       roomInfo,
  //     },
  //   });
  // };

  return <SettingRoom goToStudyRoom={goToStudyRoom} />;
}

export default JoinRoom;
