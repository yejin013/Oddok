/* eslint-disable import/prefer-default-export */
import { atom, selector } from "recoil";

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
    id: 0,
    name: "",
    category: "",
    hashtags: [],
    targetTime: 10,
    limitUsers: 4,
    isPublic: true,
    password: "",
    rule: "",
    isMicOn: false,
    isCamOn: false,
    bgmlink: "",
    startAt: "",
    endAt: "",
  },
});

const categories = [
  { value: "OFFICIAL", label: "공시생" },
  { value: "SCHOOL", label: "대입" },
  { value: "CERTIFICATE", label: "자격증" },
  { value: "EMPLOYEE", label: "취준생" },
  { value: "PERSONAL", label: "개인학습" },
  { value: "ETC", label: "일반" },
];

export const roomTitleState = selector({
  key: "roomTitleState",
  get: ({ get }) => {
    const value = get(roomInfoState).category;
    const title = categories.find((category) => category.value === value);
    return title ? `${title.label} n호실` : undefined;
  },
});
