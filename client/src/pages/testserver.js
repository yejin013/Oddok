import axios from "axios";

const OPENVIDU_SERVER_URL = `https://192.168.99.100:4443`; // ${window.location.hostname}
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

export const createToken = (sessionId) =>
  new Promise((resolve, reject) => {
    const data = {};
    axios
      .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`, data, {
        headers: {
          // eslint-disable-next-line prefer-template
          Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("get token success! ", res);
        resolve(res.data.token);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const createSession = (roomName) =>
  new Promise((resolve, reject) => {
    const data = JSON.stringify({ customSessionId: roomName });
    axios
      // eslint-disable-next-line prefer-template
      .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
        headers: {
          // eslint-disable-next-line prefer-template
          Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("create token success! ", res);
        resolve(res.data.id);
      })
      .catch((response) => {
        const error = { ...response };
        if (error?.response?.status === 409) {
          resolve(roomName);
        } else {
          console.log(error);
        }
      });
  });
