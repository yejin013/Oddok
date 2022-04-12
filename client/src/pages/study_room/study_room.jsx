import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import StudyBar from "../../components/study/study_bar/study_bar";
import UserVideo from "../../components/study/user_video/user_video";
import styles from "./study_room.module.css";
import PlanSidebar from "../../components/study/plan_sidebar/plan_sidebar";

function StudyRoom() {
  const OV = new OpenVidu();
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(1);
  const history = useHistory();
  const location = useLocation();

  const [isPlanOpen, setisPlanOpen] = useState(false);
  const [isSidebar, setisSidebar] = useState(false);
  const displayType = isSidebar === false ? styles.hide : styles.show;

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
    publisher.publishVideo(!publisher.stream.videoActive);
  };

  const toggleAudio = () => {
    publisher.publishAudio(!publisher.stream.audioActive);
  };

  useEffect(() => {
    setSession(OV.initSession());
  }, []);

  useEffect(() => {
    if (session) {
      (async () => {
        console.log("🙂", location.state.token);
        await session.connect(location.state.token);
        const devices = await OV.getDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        const localUser = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: videoDevices[0].label ? videoDevices.deviceId : undefined,
          publishAudio: true,
          publishVideo: true,
          frameRate: 30,
          mirror: false,
        });
        await session.publish(localUser);
        setPublisher(localUser);
      })();

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
    }
  }, [session]);

  const clickPlanBtn = () => {
    setisPlanOpen((prev) => !prev);
    setisSidebar((prev) => !prev);
  };

  return (
    <div className={styles.room}>
      <div className={styles.video_container}>
        <ul className={`${styles.videos} ${displayType}`}>
          {publisher && <UserVideo count={count} publisher={publisher} />}
          {subscribers && subscribers.map((subscriber) => <UserVideo count={count} subscriber={subscriber} />)}
        </ul>
        {isPlanOpen && (
          <div className={styles.plan_bar}>
            <PlanSidebar />
          </div>
        )}
      </div>
      <div className={styles.bar}>
        <StudyBar
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          leaveRoom={leaveRoom}
          onClickplanBtn={clickPlanBtn}
        />
      </div>
    </div>
  );
}

export default StudyRoom;
