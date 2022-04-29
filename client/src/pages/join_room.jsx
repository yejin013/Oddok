import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../recoil/user_state";
import { roomInfoState } from "../recoil/studyroom_state";
import { getStudyRoom, joinStudyRoom } from "../api/study-room-api";
import useAsync from "../hooks/useAsync";
import SettingRoom from "./settting_room/setting_room";
import Loading from "../components/study/Loading/Loading";
import ErrorModal from "../components/commons/ErrorModal/ErrorModal";

function JoinRoom() {
  const history = useHistory();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const setRoomInfo = useSetRecoilState(roomInfoState);
  const { data: roomData, error: getInfoError } = useAsync(() => getStudyRoom(id), [id], false);
  const { loading: isLoading, error: joinError, sendRequest: joinRoom } = useAsync(joinStudyRoom);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setUserInfo({ ...userInfo, updateAllowed: false }); // TODO 방장 아이디와 일치할 경우 수정 권한 주기
  }, []);

  useEffect(() => {
    if (roomData) {
      setRoomInfo(roomData);
    }
  }, [roomData]);

  useEffect(() => {
    setHasError(getInfoError?.reponse || joinError?.response);
  }, [getInfoError, joinError]);

  const goToStudyRoom = async () => {
    const joinResponse = await joinRoom(id);
    console.log(joinResponse);
    history.push({
      pathname: `/studyroom/${id}`,
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
      {hasError && <ErrorModal message={`${hasError.status} ${hasError.message}`} onConfirm={confirmError} />}
      <SettingRoom goToStudyRoom={goToStudyRoom} />
    </>
  );
}

export default JoinRoom;
