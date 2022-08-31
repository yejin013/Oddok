import { atom, selector } from "recoil";

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
    endAt: "2022-12-31",
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
    const roomInfo = get(roomInfoState);
    const categoryLabel = categories.find((category) => category.value === roomInfo.category);
    const title = categoryLabel ? `${categoryLabel.label} n호실` : undefined;
    return roomInfo.name ? roomInfo.name : title;
  },
});
