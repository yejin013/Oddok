import React, { useState, useEffect, useContext } from "react";
import StudyRoom from "./StudyRoom";

function SettingRoom() {
  const [userId, setUserId] = useState(`Participant${Math.floor(Math.random() * 10000)}`);
  const [isHost, setIsHost] = useState(false);
  const [isEnter, setIsEnter] = useState(false);

  const createRoom = () => {
    setIsHost(true);
    setIsEnter(true);
  };

  const joinRoom = () => {
    setIsEnter(true);
  };

  return (
    <>
      {!isEnter && (
        <div>
          <button type="button" onClick={createRoom}>
            스터디 시작하기(HOST)
          </button>
          <button type="button" onClick={joinRoom}>
            스터디 시작하기(MEMBER)
          </button>
        </div>
      )}
      {isEnter && <StudyRoom userId={userId} isHost={isHost} />}
    </>
  );
}

export default SettingRoom;
