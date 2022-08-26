import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { roomInfoState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import { startStudyRoom } from "@api/study-room-api";
import { Loading } from "@components/commons";
import { SettingRoom } from "@components/study";
import { useGoToPage, useAsync } from "@hooks";

function CreateRoom() {
  const roomInfo = useRecoilValue(roomInfoState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const setError = useSetRecoilState(errorState);
  const { goToStudy } = useGoToPage();

  const { loading, request: startStudy } = useAsync({
    requestFn: () => startStudyRoom(roomInfo),
    onSuccess: ({ id, token }) => goToStudy(id, token),
    onError: (error) => setError(error),
  });

  useEffect(() => {
    setUserInfo({ ...userInfo, updateAllowed: true }); // @TODO 방장 권한 부여
  }, []);

  return (
    <>
      {loading && <Loading />}
      <SettingRoom goToStudyRoom={startStudy} />
    </>
  );
}

export default CreateRoom;
