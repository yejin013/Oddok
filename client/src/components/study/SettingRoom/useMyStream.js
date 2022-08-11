import { useState, useRef, useEffect } from "react";

const useMyStream = () => {
  const videoRef = useRef();
  const [videoActive, setVideoActive] = useState(true);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const getVideoandAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      videoRef.current.srcObject = stream;
      const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled; // enabled 초기값: true
      window.localStream = stream;
    };
    getVideoandAudio();
    return () => {
      window.localStream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  const toggleVideo = () => {
    const myStream = videoRef.current.srcObject;
    if (!myStream) return;
    const videoTrack = myStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setVideoActive((prev) => !prev);
  };

  const toggleAudio = () => {
    const myStream = videoRef.current.srcObject;
    if (!myStream) return;
    const audioTrack = myStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setAudioActive((prev) => !prev);
  };

  return { videoRef, videoActive, audioActive, toggleVideo, toggleAudio };
};

export default useMyStream;
