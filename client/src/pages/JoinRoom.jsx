import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { roomInfoState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import { getStudyRoom, joinStudyRoom, updateStudyRoom } from "@api/study-room-api";
import useAsync from "@hooks/useAsync";
import { Loading } from "@components/commons";
import { SettingRoom } from "@components/study";

function JoinRoom() {
  const history = useHistory();
  const { roomId } = useParams();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const setRoomInfo = useSetRecoilState(roomInfoState);
  const setError = useSetRecoilState(errorState);
  const { loading, request: joinStudy } = useAsync({
    requestFn: () => joinStudyRoom(roomId),
    onSuccess: ({ token }) =>
      history.push({
        pathname: `/studyroom/${roomId}`,
        state: {
          token,
        },
      }),
    onError: (error) => setError(error),
  });

  // TODO 방장일 경우 수정권한 주기
  useEffect(() => {
    setUserInfo({ ...userInfo, updateAllowed: true });
    getStudyRoom(roomId)
      .then((data) => setRoomInfo(data))
      .catch((e) => console.error(e));
  }, []);

  const updateRoomInfo = async (roomData) => {
    try {
      const response = await updateStudyRoom(roomId, roomData);
      setRoomInfo(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <SettingRoom goToStudyRoom={joinStudy} updateRoomInfo={updateRoomInfo} />
    </>
  );
}

export default JoinRoom;
