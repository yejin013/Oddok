import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { roomInfoState } from "@recoil/studyroom-state";
import { errorState } from "@recoil/error-state";
import { getStudyRoom, joinStudyRoom } from "@api/study-room-api";
import { Loading } from "@components/commons";
import { SettingRoom } from "@components/study";
import { useAsync } from "@hooks";

function JoinRoom() {
  const history = useHistory();
  const { roomId } = useParams();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const setRoomInfo = useSetRecoilState(roomInfoState);
  const setError = useSetRecoilState(errorState);
  const { loading, request: joinStudy } = useAsync({
    requestFn: () => joinStudyRoom(roomId),
    onSuccess: ({ token }) => {
      history.push({
        pathname: `/studyroom/${roomId}`,
        state: {
          token,
        },
      });
    },
    onError: (error) => setError(error),
  });

  useEffect(() => {
    setUserInfo({ ...userInfo, updateAllowed: false }); // @TODO 방장 권한 부여
    getStudyRoom(roomId)
      .then((data) => setRoomInfo(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      {loading && <Loading />}
      <SettingRoom goToStudyRoom={() => joinStudy()} />
    </>
  );
}

export default JoinRoom;
