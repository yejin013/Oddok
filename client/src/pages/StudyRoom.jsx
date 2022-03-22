import React, { useState, useEffect } from "react";
import UserVideo from "../components/UserVideo";

function StudyRoom({ session, publisher, test }) {
  const [subscribers, setSubscribers] = useState([]);

  const leaveRoom = () => {
    session.disconnect();
    setSubscribers([]);
    test();
  };

  const toggleMic = () => {
    publisher.publishAudio(!publisher.stream.audioActive);
  };

  const toggleCam = () => {
    publisher.publishVideo(!publisher.stream.videoActive);
  };

  useEffect(() => {
    session.publish(publisher);
  }, [session, publisher]);

  useEffect(() => {
    session.on("streamCreated", (event) => {
      const participant = session.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, participant]);
    });
    session.on("streamDestroyed", (event) => {
      const index = subscribers.indexOf(event.stream.streamManager, 0);
      if (index > -1) {
        subscribers.splice(index, 1);
        setSubscribers(subscribers);
      }
    });
    session.on("exception", (exception) => {
      console.warn(exception);
    });
  }, [session]);

  return (
    <div id="video-container">
      <button type="button" onClick={toggleCam}>
        비디오🎥
      </button>
      <button type="button" onClick={toggleMic}>
        마이크🎙️
      </button>
      <button type="button" onClick={leaveRoom}>
        나가기🚪
      </button>
      <div className="stream-container publisher">{publisher && <UserVideo streamManager={publisher} />}</div>
      <div className="stream-container subscribers">
        {subscribers ? subscribers.map((subscriber) => <UserVideo streamManager={subscriber} />) : null}
      </div>
    </div>
  );
}

export default StudyRoom;
