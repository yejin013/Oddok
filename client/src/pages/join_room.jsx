import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user_state";
import { roomInfoState } from "@recoil/studyroom_state";
import { getStudyRoom, joinStudyRoom } from "@api/study-room-api";
import useAsync from "@hooks/useAsync";
import { Loading } from "@components/study";
import { Modal } from "@components/commons";
import SettingRoom from "./setting_room/setting_room";

function JoinRoom() {
  const history = useHistory();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const setRoomInfo = useSetRecoilState(roomInfoState);
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

  useEffect(() => {
    setUserInfo({ ...userInfo, updateAllowed: false }); // TODO 방장 아이디와 일치할 경우 수정 권한 주기
  }, []);

  useEffect(() => {
    if (roomData) {
      setRoomInfo(roomData);
    }
  }, [roomData, setRoomInfo]);

  const goToStudyRoom = async () => {
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
        <Modal
          title="ERROR⚠️"
          content={getInfoError?.data.message || joinError?.data.message}
          onConfirm={confirmError}
          onAction={{ text: "메인으로 돌아가기", action: () => history.push("/") }}
        />
      )}
      <SettingRoom goToStudyRoom={goToStudyRoom} />
    </>
  );
}

export default JoinRoom;
