import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import StudyBar from "../../components/study/study_bar/study_bar";
import UserVideo from "../../components/study/user_video/user_video";
import styles from "./study_room.module.css";

function StudyRoom({ session, publisher }) {
  const history = useHistory();
  // const location = useLocation();
  // const { session, publisher } = location.state;
  const countRef = useRef();
  const [count, setCount] = useState(1);
  const [subscribers, setSubscribers] = useState([]);

  const leaveRoom = () => {
    session.disconnect();
    setSubscribers([]);
    setCount(1);
    history.push({
      pathname: "/",
    });
  };

  const deleteSubscriber = (streamManager) => {
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
    }
    setCount((prev) => prev - 1);
  };

  const toggleVideo = () => {
    console.log(publisher.stream.videoActive);
    publisher.publishVideo(!publisher.stream.videoActive);
  };

  const toggleAudio = () => {
    publisher.publishAudio(!publisher.stream.audioActive);
  };

  useEffect(() => {
    session.publish(publisher);
  }, [session, publisher]);

  useEffect(() => {
    session.on("streamCreated", (event) => {
      const participant = session.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, participant]);
      setCount((prev) => prev + 1);
    });
    session.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });
    session.on("exception", (exception) => {
      console.warn(exception);
    });
  }, [session]);

  return (
    <div className={styles.room}>
      <div className={styles.video_container}>
        <ul className={styles.videos} ref={countRef}>
          <UserVideo count={count} streamManager={publisher} />
          {subscribers && subscribers.map((subscriber) => <UserVideo count={count} streamManager={subscriber} />)}
        </ul>
      </div>
      <div className={styles.bar}>
        <StudyBar toggleVideo={toggleVideo} toggleAudio={toggleAudio} leaveRoom={leaveRoom} />
      </div>
    </div>
  );
}

export default StudyRoom;
