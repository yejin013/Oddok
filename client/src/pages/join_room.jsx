import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user_state";
import { roomInfoState } from "../recoil/studyroom_state";
import { getStudyRoom, joinStudyRoom } from "../api/study-room-api";
import SettingRoom from "./settting_room/setting_room";
import Loading from "../components/study/Loading/Loading";
import ErrorModal from "../components/commons/ErrorModal/ErrorModal";

function JoinRoom() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const roomID = localStorage.getItem("roomID"); // TODO 추후 삭제 (방 참여시 사용하기 위함)
      getStudyRoom(roomID).then((data) => {
        setRoomInfo(data);
      });
    } catch (e) {
      setError({ status: e.response.status, message: e.response.data.message });
    }

    // TODO 방장 아이디와 일치할 경우 수정 권한 주기
    // ✅ 방 정보의 방장아이디 이용!
    setUserInfo({ ...userInfo, updateAllowed: false });
  }, []);

  const goToStudyRoom = async () => {
    setIsLoading(true);
    try {
      const roomID = localStorage.getItem("roomID"); // TODO roomInfo.id로 바꾸기
      const token = await joinStudyRoom(roomID);
      history.push({
        pathname: `/studyroom/${roomID}`,
        state: {
          token: token.token,
        },
      });
    } catch (e) {
      setIsLoading(false);
      setError({ status: e.response.status, message: e.response.data.message });
    }
  };

  const confirmError = () => {
    setError(null);
  };

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorModal message={`${error.status} ${error.message}`} onConfirm={confirmError} />}
      <SettingRoom goToStudyRoom={goToStudyRoom} />
    </>
  );
}

export default JoinRoom;
