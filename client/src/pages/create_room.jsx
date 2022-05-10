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
  const {
    loading: createLoading,
    error: createError,
    sendRequest: createRequest,
    reset: createErrorReset,
  } = useAsync(createStudyRoom, {
    onError: (error) => console.error(error),
  });
  const {
    loading: joinLoading,
    error: joinError,
    sendRequest: joinRequest,
    reset: joinErrorReset,
  } = useAsync(joinStudyRoom, {
    onError: (error) => console.error(error),
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

  const onConfirm = () => {
    if (createError) {
      createErrorReset();
      return;
    }
    if (joinError) joinErrorReset();
  };

  return (
    <>
      {(createLoading || joinLoading) && <Loading />}
      {(createError || joinError) && (
        <ErrorModal
          message={createError?.data.message || joinError?.data.message}
          onConfirm={onConfirm}
          onAction={{ text: "메인으로 돌아가기", action: () => history.push("/") }}
        />
      )}
      <SettingRoom goToStudyRoom={goToStudyRoom} />
    </>
  );
}

export default CreateRoom;
