import React, { useEffect, useState } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { createSession, createToken } from "./testserver";

import StudyRoom from "./StudyRoom";
import UserVideo from "../components/UserVideo";

const testdata = {
  name: "일반 1호실",
  category: "일반",
  hashtags: ["교시제", "아침기상", "인증"],
  target_time: "10시간",
  limit_users: "4",
  is_public: false,
  password: "1234",
  rule: "규칙",
};

function SettingRoom() {
  const [userId, setUserId] = useState(`${Math.floor(Math.random() * 10000000)}`);
  const [isHost, setIsHost] = useState(true);
  const [isEnter, setIsEnter] = useState(false);

  const OV = new OpenVidu();
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRoom = () => {
    setIsHost(true);
    setIsEnter(true);
  };

  const test = () => {
    setIsEnter(!isEnter);
  };

  const toggleCam = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMic = () => {
    setIsMuted((prev) => !prev);
  };

  // Publisher 객체 생성
  useEffect(async () => {
    setSession(OV.initSession());
    const devices = await OV.getDevices();
    const videoDevices = devices.filter((device) => device.kind === "videoinput");
    setPublisher(
      OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: videoDevices.label ? videoDevices.deviceId : undefined,
        publishAudio: true,
        publishVideo: true,
        frameRate: 30,
        mirror: false,
      }),
    );
  }, []);

  // 카메라, 마이크 설정
  useEffect(() => {
    if (publisher) {
      publisher.publishVideo(isPlaying);
      publisher.publishAudio(isMuted);
    }
  }, [isPlaying, isMuted]);

  // TEST용
  // useEffect(async () => {
  //   if (session) {
  //     if (isHost) {
  //       const roomId = await createSession("1").catch((err) => console.log("session create error"));
  //       const token = await createToken(roomId).catch((err) => console.log("token create error"));
  //       await session.connect(token, { clientData: userId }).catch((err) => console.log("session connect error"));
  //     } else if (!isHost) {
  //       const token = await createToken("1");
  //       await session.connect(token, { clientData: userId });
  //     }
  //   }
  // }, [session]);

  // 서버용🤔
  useEffect(async () => {
    if (session) {
      if (isHost) {
        setIsLoading(true);
        setError(null);
        try {
          const id = await axios.post("/study-room", JSON.stringify(testdata), {
            headers: { "Content-Type": "application/json", userId },
          });
          const token = await axios.post(`/study-room/join/${id.data.id}`, { userId });
          await session.connect(token.data.token, { clientData: userId });
        } catch (err) {
          console.log(err.code, err.message);
          setError(err.message);
        }
        setIsLoading(false);
      }
    }
  }, [session]);

  return (
    <>
      {!isEnter && (
        <div>
          <div className="stream-container publisher">{publisher && <UserVideo streamManager={publisher} />}</div>
          <button type="button" onClick={toggleCam}>
            비디오🎥
          </button>
          <button type="button" onClick={toggleMic}>
            마이크🎙️
          </button>
          <button type="button" onClick={createRoom}>
            스터디 시작하기
          </button>
        </div>
      )}
      {isEnter && !error && <StudyRoom session={session} publisher={publisher} test={test} />}
      {isLoading && <p>Loading...............</p>}
      {error && <p>{error}</p>}
    </>
  );
}

export default SettingRoom;
