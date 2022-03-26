/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";

export const videoState = atom({
  key: "videoState",
  default: true,
});

export const audioState = atom({
  key: "audioState",
  default: true,
});

export const roomInfoState = atom({
  key: "roomInfoState",
  default: {
    category: "",
    hastags: [],
    targetTime: 0,
    limitUsers: 0,
    isPublic: true,
    password: "",
    rule: "",
    isMicOn: false,
    isCamOn: false,
    bgmlink: "",
  },
});
