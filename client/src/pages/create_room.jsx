import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user_state";
import { roomInfoState } from "../recoil/studyroom_state";
import { createStudyRoom, joinStudyRoom } from "../api/study-room-api";
import { getTestUser } from "../api/getTestUser";
import SettingRoom from "./settting_room/setting_room";
import Loading from "../components/study/Loading/Loading";
import ErrorModal from "../components/commons/ErrorModal/ErrorModal";

function CreateRoom() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 스터디룸을 개설하는 유저에게 방 정보 업데이트 권한을 준다
    setUserInfo({ ...userInfo, updateAllowed: true });

    /* get testUser */
    getTestUser()
      .then((users) => console.log(users))
      .catch((e) => console.log(`get user error!: ${e}`));
  }, []);

  const goToStudyRoom = async () => {
    setIsLoading(true);
    try {
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

export default CreateRoom;
