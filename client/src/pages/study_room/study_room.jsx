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

  const [clickedPlanBtn, setClickedPlanBtn] = useState(false);
  const [isSidebar, setisSidebar] = useState(false);
  const displayType = isSidebar === false ? styles.hide : styles.show;

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isRecorded, setIsRecorded] = useState(false);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

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

  useEffect(() => {
    let timer;
    if (isRecorded) {
      timer = setInterval(() => {
        if (minute > 59) {
          setHour((prev) => prev + 1);
          setMinute(0);
        }
        if (second === 59) {
          setMinute((prev) => prev + 1);
          setSecond(0);
        }
        if (second < 59) {
          setSecond((prev) => prev + 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  });

  const getStartTime = () => {
    const time = new Date();
    setStartTime(time);
    setIsRecorded((prev) => !prev);
  };

  const getEndTime = () => {
    const time = new Date();
    setEndTime(time);
    setIsRecorded((prev) => !prev);
    /* server에 selectedPlan, startTime, endTime, studyRooomId post */
  };

  const clickPlanBtn = () => {
    setClickedPlanBtn((prev) => !prev);
    setisSidebar((prev) => !prev);
  };

  const getStyles = (clicked) => {
    let style;
    if (clicked) {
      style = styles.show;
    } else {
      style = styles.hide;
    }
    return style;
  };

  return (
    <div className={styles.room}>
      <div className={styles.video_container}>
        <ul className={`${styles.videos} ${displayType}`}>
          {publisher && (
            <UserVideo count={count} streamManager={publisher} hour={hour} minute={minute} second={second} />
          )}
          {subscribers &&
            subscribers.map((subscriber) => (
              <UserVideo count={count} streamManager={subscriber} hour={hour} minute={minute} second={second} />
            ))}
        </ul>
        <div className={`${styles.plan_bar} ${getStyles(clickedPlanBtn)}`}>
          <PlanSidebar />
        </div>
      </div>
      <div className={styles.bar}>
        <StudyBar
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          leaveRoom={leaveRoom}
          isRecorded={isRecorded}
          getStartTime={getStartTime}
          getEndTime={getEndTime}
          onClickplanBtn={clickPlanBtn}
        />
      </div>
    </div>
  );
}

export default StudyRoom;
