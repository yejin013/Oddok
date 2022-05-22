import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user_state";
import { roomIdState, roomInfoState } from "@recoil/studyroom_state";
import { getStudyRoom, joinStudyRoom } from "@api/study-room-api";
import useAsync from "@hooks/useAsync";
import { Loading } from "@components/study";
import { ErrorModal } from "@components/commons";
import SettingRoom from "./setting_room/setting_room";

function JoinRoom() {
  const history = useHistory();
  const { id } = useParams();
  const setRoomId = useSetRecoilState(roomIdState);
  const setRoomInfo = useSetRecoilState(roomInfoState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const {
    data: roomData,
    error: getInfoError,
    reset: getInfoErrorReset,
  } = useAsync(() => getStudyRoom(id), { onError: (error) => console.log(error) }, [id], false);
  const {
    loading: isLoading,
    error: joinError,
    sendRequest: joinRoom,
    reset: joinErrorReset,
  } = useAsync(joinStudyRoom, {
    onError: (error) => console.error(error),
  });

  // TODO 방장일 경우 수정권한 주기
  useEffect(() => {
    setUserInfo({ ...userInfo, updateAllowed: true });
  }, []);

  useEffect(() => {
    if (roomData) {
      setRoomInfo(roomData);
    }
  }, [roomData, setRoomInfo]);

  const goToStudyRoom = async () => {
    setRoomId(id);
    const joinResponse = await joinRoom(id);
    history.push({
      pathname: `/studyroom/${id}`,
      state: {
        token: joinResponse.token,
      },
    });
  };

  const confirmError = () => {
    if (getInfoError) {
      getInfoErrorReset();
      return;
    }
    if (joinError) joinErrorReset();
  };

  return (
    <>
      {isLoading && <Loading />}
      {(getInfoError || joinError) && (
        <ErrorModal
          message={getInfoError?.data.message || joinError?.data.message}
          onConfirm={confirmError}
          onAction={{ text: "메인으로 돌아가기", action: () => history.push("/") }}
        />
      )}
      <SettingRoom roomId={id} goToStudyRoom={goToStudyRoom} />
    </>
  );
}

export default JoinRoom;
