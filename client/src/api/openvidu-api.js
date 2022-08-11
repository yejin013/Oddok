import { OpenVidu } from "openvidu-browser";
import OpenviduError from "@api/error/OpenviduError";
import { OPENVIDU_MESSAGE } from "@utils/constants/API_ERROR";
import { leaveStudyRoom } from "@api/study-room-api";

const OV = new OpenVidu();

export const initSession = () => OV.initSession();

export const connectToSession = async (session, token, userData, roomId) => {
  try {
    session.connect(token, userData);
  } catch (error) {
    await leaveStudyRoom(roomId);
    throw new OpenviduError(error, OPENVIDU_MESSAGE.CONNECT[error.code]);
  }
};

export const connectDevice = async () => {
  try {
    const devices = await OV.getDevices();
    return devices.filter((device) => device.kind === "videoinput");
  } catch (error) {
    throw new OpenviduError(error);
  }
};

export const initPublisher = async (deviceId, deviceStatus) => {
  try {
    return OV.initPublisherAsync(undefined, {
      audioSource: undefined,
      videoSource: deviceId,
      publishAudio: deviceStatus.mic,
      publishVideo: deviceStatus.cam,
      frameRate: 30,
      mirror: false,
    });
  } catch (error) {
    throw new OpenviduError(error);
  }
};
