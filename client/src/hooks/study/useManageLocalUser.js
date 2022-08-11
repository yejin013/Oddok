import { useState } from "react";
import { useRecoilValue } from "recoil";
import { deviceState } from "@recoil/studyroom-state";
import { userState } from "@recoil/user-state";

const useManageLocalUser = () => {
  const { nickname, updateAllowed } = useRecoilValue(userState);
  const { mic, cam } = useRecoilValue(deviceState);
  const [localUser, setLocalUser] = useState({
    nickname,
    isHost: updateAllowed,
    isMicOn: mic,
  });
  const [videoActive, setVideoActive] = useState(cam);
  const [audioActive, setAudioActive] = useState(mic);

  const toggleVideo = () => {
    localUser.stream.publishVideo(!localUser.stream.stream.videoActive);
    setVideoActive(localUser.stream.stream.videoActive);
  };

  const toggleAudio = () => {
    localUser.stream.publishAudio(!localUser.stream.stream.audioActive);
    setAudioActive(localUser.stream.stream.audioActive);
    setLocalUser((prev) => ({ ...prev, isMicOn: localUser.stream.stream.audioActive }));
  };

  return {
    localUser,
    setLocalUser,
    videoActive,
    audioActive,
    toggleVideo,
    toggleAudio,
  };
};

export default useManageLocalUser;
