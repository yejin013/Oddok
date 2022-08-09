import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { roomInfoState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import useAsync from "@hooks/useAsync";
import { startStudyRoom } from "@api/study-room-api";
import { Loading } from "@components/commons";
import { SettingRoom } from "@components/study";

function CreateRoom() {
  const history = useHistory();
  const roomInfo = useRecoilValue(roomInfoState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const setError = useSetRecoilState(errorState);
  const { loading, request: startStudy } = useAsync({
    requestFn: () => startStudyRoom(roomInfo),
    onSuccess: ({ id, token }) =>
      history.push({
        pathname: `/studyroom/${id}`,
        state: {
          token,
        },
      }),
    onError: (error) => setError(error),
  });

  useEffect(() => {
    // 스터디룸을 개설하는 유저에게 방 정보 업데이트 권한을 준다 (추후 삭제)
    setUserInfo({ ...userInfo, updateAllowed: true });
  }, []);

  return (
    <>
      {loading && <Loading />}
      <SettingRoom goToStudyRoom={startStudy} />
    </>
  );
}

export default CreateRoom;
