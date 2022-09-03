import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { roomInfoState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import { startStudyRoom } from "@api/study-room-api";
import { Loading } from "@components/commons";
import { SettingRoom } from "@components/study";
import { useGoToPage, useAsync } from "@hooks";

function CreateRoom() {
  const roomInfo = useRecoilValue(roomInfoState);
  const setError = useSetRecoilState(errorState);
  const { goToStudy } = useGoToPage();
  const { loading, request: startStudy } = useAsync({
    requestFn: () => startStudyRoom(roomInfo),
    onSuccess: ({ id, token }) => goToStudy(id, token),
    onError: (error) => setError(error),
  });

  return (
    <>
      {loading && <Loading />}
      <SettingRoom goToStudyRoom={startStudy} />
    </>
  );
}

export default CreateRoom;
