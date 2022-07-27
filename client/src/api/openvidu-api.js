import { OpenVidu } from "openvidu-browser";
import OpenviduError from "@api/error/OpenviduError";
import { OPENVIDU_MESSAGE } from "@utils/constants/API_ERROR";
import { leaveStudyRoom } from "@api/study-room-api";

const OV = new OpenVidu();

export const initSession = () => OV.initSession();

export const connectToSession = async (session, token, userData, roomId) => {
  try {
    await session.connect(token, userData);
  } catch (error) {
    await leaveStudyRoom(roomId);
    throw new OpenviduError(error, OPENVIDU_MESSAGE.CONNECT[error.code]);
  }
};

export const connectDevice = async (deviceStatus) => {
  try {
    const devices = await OV.getDevices();
    const videoDevice = devices.filter((device) => device.kind === "videoinput");
    return OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevice.deviceId,
      publishAudio: deviceStatus.mic,
      publishVideo: deviceStatus.cam,
      frameRate: 30,
      mirror: false,
    });
  } catch (error) {
    throw new OpenviduError(error);
  }
};

export const publishStream = async (session, userStream) => {
  try {
    await session.publish(userStream);
  } catch (error) {
    throw new OpenviduError(error);
  }
};
