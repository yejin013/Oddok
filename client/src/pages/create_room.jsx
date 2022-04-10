import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user_state";
import { roomInfoState } from "../recoil/studyroom_state";
import { createStudyRoom, joinStudyRoom } from "../api/studyroomAPI";
import SettingRoom from "./settting_room/setting_room";

import { createSession, createToken } from "./testserver";

function CreateRoom() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

  // 스터디룸을 개설하는 유저에게 방 정보 업데이트 권한을 준다
  useEffect(() => {
    setUserInfo({ ...userInfo, updateAllowed: true });
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

  // 테스트용
  // const goToStudyRoom = async () => {
  //   console.log(roomInfo);
  //   const roomId = await createSession(roomInfo.name);
  //   const token = await createToken(roomId.data.sessionId);
  //   history.push({
  //     pathname: `/studyroom/${roomId.data.sessionId}`,
  //     state: {
  //       token: token.data.token,
  //       roomInfo,
  //     },
  //   });
  // };

  return <SettingRoom goToStudyRoom={goToStudyRoom} />;
}

export default CreateRoom;
