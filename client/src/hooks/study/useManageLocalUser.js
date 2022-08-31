import { useState } from "react";
import { useRecoilValue } from "recoil";
import { deviceState } from "@recoil/studyroom-state";
import { userState } from "@recoil/user-state";

const useManageLocalUser = () => {
  const { nickname, updateAllowed } = useRecoilValue(userState);
  const { video, audio } = useRecoilValue(deviceState);
  const [localUser, setLocalUser] = useState({
    nickname,
    isHost: updateAllowed,
    audioActive: audio,
  });
  const [videoActive, setVideoActive] = useState(video);
  const [audioActive, setAudioActive] = useState(audio);

  const toggleVideo = () => {
    localUser.stream.publishVideo(!localUser.stream.stream.videoActive);
    setVideoActive(localUser.stream.stream.videoActive);
  };

  const toggleAudio = () => {
    localUser.stream.publishAudio(!localUser.stream.stream.audioActive);
    setAudioActive(localUser.stream.stream.audioActive);
    setLocalUser((prev) => ({ ...prev, audioActive: localUser.stream.stream.audioActive }));
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
