import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { roomIdState, roomInfoState } from "@recoil/studyroom-state";
import { createStudyRoom, joinStudyRoom } from "@api/study-room-api";
import useAsync from "@hooks/useAsync";
import { Loading, ErrorModal } from "@components/commons";
import SettingRoom from "./SettingRoom/SettingRoom";

function CreateRoom() {
  const history = useHistory();
  const setRoomId = useSetRecoilState(roomIdState);
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
    // 스터디룸을 개설하는 유저에게 방 정보 업데이트 권한을 준다 (추후 삭제)
    setUserInfo({ ...userInfo, updateAllowed: true });
  }, []);

  const goToStudyRoom = async () => {
    const createResponse = await createRequest(roomInfo);
    const joinResponse = await joinRequest(createResponse.id);
    setRoomId(createResponse.id);
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
