import { atom } from "recoil";

export const deviceState = atom({
  key: "deviceState",
  default: {
    video: true,
    audio: false,
  },
});

export const roomInfoState = atom({
  key: "roomInfoState",
  default: {
    name: "",
    category: null,
    hashtags: [],
    targetTime: 10,
    limitUsers: null,
    isPublic: true,
    password: "",
    rule: "",
    isMicOn: false,
    isCamOn: false,
    bgmlink: "",
    endAt: "2022-12-31",
  },
});
