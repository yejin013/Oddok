import axios from "axios";

const OPENVIDU_SERVER_URL = `https://${window.location.hostname}`; // 192.168.99.100:4443
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

export const createToken = (roomId) =>
  new Promise((resolve, reject) => {
    const data = {};
    axios
      .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${roomId}/connection`, data, {
        headers: {
          // eslint-disable-next-line prefer-template
          Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("방 토큰 얻기 성공! ", res);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const createSession = (roomInfo) =>
  new Promise((resolve, reject) => {
    const data = JSON.stringify();
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
        console.log("방 생성 성공!", res);
        localStorage.setItem("sessionId", res.data.sessionId);
        resolve(res);
      })
      .catch((response) => {
        const error = { ...response };
        if (error?.response?.status === 409) {
          console.log("방 중복 에러");
          resolve(response);
        } else {
          console.log(error);
        }
      });
  });
