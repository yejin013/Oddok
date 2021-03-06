import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { roomIdState, roomInfoState } from "@recoil/studyroom-state";
import { getStudyRoom, joinStudyRoom, updateStudyRoom } from "@api/study-room-api";
import useAsync from "@hooks/useAsync";
import { Loading, Modal } from "@components/commons";
import { SettingRoom } from "@components/study";

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
  } = useAsync(() => getStudyRoom(id), [id], false);
  const {
    loading: isLoading,
    error: joinError,
    sendRequest: joinRoom,
    reset: joinErrorReset,
  } = useAsync(joinStudyRoom);

  // TODO 방장일 경우 수정권한 주기
  useEffect(() => {
    setUserInfo({ ...userInfo, updateAllowed: false });
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

  const onClose = () => {
    if (getInfoError) {
      getInfoErrorReset();
      return;
    }
    if (joinError) joinErrorReset();
  };

  const updateRoomInfo = async (data) => {
    try {
      const response = await updateStudyRoom(id, data);
      setRoomInfo(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {(getInfoError || joinError) && (
        <Modal
          title="ERROR⚠️"
          content={getInfoError?.data.message || joinError?.data.message}
          onClose={onClose}
          onAction={{ text: "메인으로 돌아가기", action: () => history.push("/") }}
        />
      )}
      <SettingRoom goToStudyRoom={goToStudyRoom} updateRoomInfo={updateRoomInfo} />
    </>
  );
}

export default JoinRoom;
