import React, { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import UserVideo from "../components/UserVideo";
import { createSession, createToken } from "./testserver";

function StudyRoom({ userId, isHost }) {
  const OV = new OpenVidu();
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);

  const leaveRoom = () => {
    session.disconnect();
    setSession(undefined);
    setPublisher(undefined);
    setSubscribers([]);
  };

  useEffect(() => {
    setSession(OV.initSession());
  }, []);

  useEffect(() => {
    if (session) {
      // get token (with backend server)
      // session connect (with openvidu server)
      if (isHost) {
        axios
          .post("/study-room", { name: "1", user: userId })
          .then((roomId) => {
            // 🧐나중에 roomId로 입장 요청
            axios
              .post("study-room/1", { user: userId })
              .then((res) => {
                session
                  .connect(res.json().token, { clientData: userId })
                  .then(async () => {
                    const devices = await OV.getDevices();
                    const videoDevices = devices.filter((device) => device.kind === "videoinput");
                    const me = OV.initPublisher(undefined, {
                      audioSource: undefined, // The source of audio. If undefined default microphone
                      videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                      publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                      publishVideo: true, // Whether you want to start publishing with your video enabled or not
                      resolution: "480x360", // The resolution of your video
                      frameRate: 30, // The frame rate of your video
                      insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                      mirror: false, // Whether to mirror your local video or not
                    });
                    session.publish(me);
                    setPublisher(me);
                  })
                  .catch((error) => {
                    console.log("session connect ERROR!:", error.code, error.message);
                  });
              })
              .catch((error) => console.log("room 입장 ERROR!: ", error));
          })
          .catch((error) => console.log("room 생성 ERROR!: ", error));
      } else if (!isHost) {
        axios
          .post("/study-room/1", { user: userId })
          .then((res) => {
            session
              .connect(res.json().token, { clientData: userId })
              .then(async () => {
                const devices = await OV.getDevices();
                const videoDevices = devices.filter((device) => device.kind === "videoinput");
                const me = OV.initPublisher(undefined, {
                  audioSource: undefined, // The source of audio. If undefined default microphone
                  videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                  publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                  publishVideo: true, // Whether you want to start publishing with your video enabled or not
                  resolution: "480x360", // The resolution of your video
                  frameRate: 30, // The frame rate of your video
                  insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                  mirror: false, // Whether to mirror your local video or not
                });
                session.publish(me);
                setPublisher(me);
              })
              .catch((error) => {
                console.log("session connect ERROR!:", error.code, error.message);
              });
          })
          .catch((error) => console.log("room 입장 ERROR!: ", error));
      }

      // TEST용
      // if (isHost) {
      //   createSession("1")
      //     .then((roomId) => createToken(roomId))
      //     .then((token) => {
      //       session.connect(token, { clientData: userId }).then(async () => {
      //         const devices = await OV.getDevices();
      //         const videoDevices = devices.filter((device) => device.kind === "videoinput");
      //         const me = OV.initPublisher(undefined, {
      //           audioSource: undefined, // The source of audio. If undefined default microphone
      //           videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
      //           publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
      //           publishVideo: true, // Whether you want to start publishing with your video enabled or not
      //           resolution: "480x360", // The resolution of your video
      //           frameRate: 30, // The frame rate of your video
      //           insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
      //           mirror: false, // Whether to mirror your local video or not
      //         });
      //         session.publish(me);
      //         setPublisher(me);
      //       });
      //     });
      // } else if (!isHost) {
      //   createToken("1").then((token) => {
      //     session.connect(token, { clientData: userId }).then(async () => {
      //       const devices = await OV.getDevices();
      //       const videoDevices = devices.filter((device) => device.kind === "videoinput");
      //       const me = OV.initPublisher(undefined, {
      //         audioSource: undefined, // The source of audio. If undefined default microphone
      //         videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
      //         publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
      //         publishVideo: true, // Whether you want to start publishing with your video enabled or not
      //         resolution: "480x360", // The resolution of your video
      //         frameRate: 30, // The frame rate of your video
      //         insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
      //         mirror: false, // Whether to mirror your local video or not
      //       });
      //       session.publish(me);
      //       setPublisher(me);
      //     });
      //   });
      // }
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      // session event 핸들링 (with openvidu server)
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
    }
  }, [session]);

  return (
    <div id="video-container">
      <button type="button" onClick={leaveRoom}>
        🚪
      </button>
      <div className="stream-container publisher">{publisher && <UserVideo streamManager={publisher} />}</div>
      <div className="stream-container subscribers">
        {subscribers ? subscribers.map((subscriber) => <UserVideo streamManager={subscriber} />) : null}
      </div>
    </div>
  );
}

export default StudyRoom;
