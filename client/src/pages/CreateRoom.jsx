import React, { useEffect, useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { roomInfoState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import { startStudyRoom } from "@api/study-room-api";
import { Loading } from "@components/commons";
import { SettingRoom } from "@components/study";
import { useGoToPage, useAsync } from "@hooks";

function CreateRoom() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const roomInfo = useRecoilValue(roomInfoState);
  const resetRoomInfo = useResetRecoilState(roomInfoState);
  const setError = useSetRecoilState(errorState);
  const { goToStudy } = useGoToPage();
  const { loading, request: startStudy } = useAsync({
    requestFn: () => startStudyRoom(roomInfo),
    onSuccess: ({ id, token }) => goToStudy(id, token),
    onError: (error) => setError(error),
  });

  useLayoutEffect(() => {
    setUserInfo({ ...userInfo, updateAllowed: true }); // @TODO 방장 권한 부여
    resetRoomInfo();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <SettingRoom goToStudyRoom={startStudy} />
    </>
  );
}

export default CreateRoom;
