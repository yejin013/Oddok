import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user_state";
import { roomInfoState } from "../recoil/studyroom_state";
import { createStudyRoom, joinStudyRoom } from "../api/study-room-api";
import { getTestUser } from "../api/getTestUser";
import useAsync from "../hooks/useAsync";
import SettingRoom from "./settting_room/setting_room";
import Loading from "../components/study/Loading/Loading";
import ErrorModal from "../components/commons/ErrorModal/ErrorModal";

function CreateRoom() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const { error: createError, sendRequest: createRoom } = useAsync(createStudyRoom);
  const { error: joinError, sendRequest: joinRoom } = useAsync(joinStudyRoom);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    // 스터디룸을 개설하는 유저에게 방 정보 업데이트 권한을 준다
    setUserInfo({ ...userInfo, updateAllowed: true });

    /* get testUser */
    getTestUser()
      .then((users) => console.log(users))
      .catch((e) => console.log(`get user error!: ${e}`));
  }, []);

  useEffect(() => {
    setHasError(createError?.response || joinError?.response);
    setIsLoading(false);
  }, [createError, joinError]);

  const goToStudyRoom = async () => {
    setIsLoading(true);
    const createResponse = await createRoom(roomInfo);
    const joinResponse = await joinRoom(createResponse.id);
    setIsLoading(false);
    history.push({
      pathname: `/studyroom/${createResponse.id}`,
      state: {
        token: joinResponse.token,
      },
    });
  };

  const confirmError = () => {
    setHasError(null);
  };

  return (
    <>
      {isLoading && <Loading />}
      {hasError && <ErrorModal message={`${hasError?.status} ${hasError?.data.message}`} onConfirm={confirmError} />}
      <SettingRoom goToStudyRoom={goToStudyRoom} />
    </>
  );
}

export default CreateRoom;
