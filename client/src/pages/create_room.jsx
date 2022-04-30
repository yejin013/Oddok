import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user_state";
import { roomInfoState } from "../recoil/studyroom_state";
import { createStudyRoom, joinStudyRoom } from "../api/study-room-api";
import { getTestUser } from "../api/getTestUser";
import useAsync from "../hooks/useAsync";
import { errorMapping } from "../api/studyroom-error-mapping";
import SettingRoom from "./settting_room/setting_room";
import Loading from "../components/study/Loading/Loading";
import ErrorModal from "../components/commons/ErrorModal/ErrorModal";

function CreateRoom() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const [handleError, setHandleError] = useState(); // message, action, route
  const {
    loading: createLoading,
    error: createError,
    sendRequest: createRequest,
    reset: createReset,
  } = useAsync(createStudyRoom, {
    onError: (error) => {
      setHandleError(errorMapping("create-room", error));
    },
  });
  const {
    loading: joinLoading,
    error: joinError,
    sendRequest: joinRequest,
    reset: joinReset,
  } = useAsync(joinStudyRoom, {
    onError: (error) => {
      setHandleError(errorMapping("join-room", error));
    },
  });

  useEffect(() => {
    // 스터디룸을 개설하는 유저에게 방 정보 업데이트 권한을 준다
    setUserInfo({ ...userInfo, updateAllowed: true });

    /* get testUser */
    // getTestUser()
    //   .then((users) => console.log(users))
    //   .catch((e) => console.log(`get user error!: ${e}`));
  }, []);

  const goToStudyRoom = async () => {
    const createResponse = await createRequest(roomInfo);
    const joinResponse = await joinRequest(createResponse.id);
    history.push({
      pathname: `/studyroom/${createResponse.id}`,
      state: {
        token: joinResponse.token,
      },
    });
  };

  const confirmError = () => {
    if (createError) {
      createReset();
      return;
    }
    if (joinError) joinReset();
  };

  return (
    <>
      {(createLoading || joinLoading) && <Loading />}
      {(createError || joinError) && ( //
        <ErrorModal onConfirm={confirmError} onAction={handleError} />
      )}
      <SettingRoom goToStudyRoom={goToStudyRoom} />
    </>
  );
}

export default CreateRoom;
