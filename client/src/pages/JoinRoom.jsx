import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { roomInfoState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import { getStudyRoom, joinStudyRoom } from "@api/study-room-api";
import { Loading } from "@components/commons";
import { SettingRoom } from "@components/study";
import { useGoToPage, useAsync } from "@hooks";

function JoinRoom() {
  const { roomId } = useParams();
  const [user, setUser] = useRecoilState(userState);
  const setRoomInfo = useSetRecoilState(roomInfoState);
  const setError = useSetRecoilState(errorState);
  const { goToStudy } = useGoToPage();
  const { loading: joinReqLoading, request: joinStudy } = useAsync({
    requestFn: () => joinStudyRoom(roomId),
    onSuccess: ({ token }) => goToStudy(roomId, token),
    onError: (error) => setError(error),
  });

  useEffect(() => {
    getStudyRoom(roomId)
      .then((data) => {
        setRoomInfo(data);
        if (data.userId === user.id) {
          setUser((prev) => ({ ...prev, updateAllowed: true }));
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      {joinReqLoading && <Loading />}
      <SettingRoom goToStudyRoom={joinStudy} />
    </>
  );
}

export default JoinRoom;
