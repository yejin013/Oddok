import { atom, selector } from "recoil";

export const videoState = atom({
  key: "videoState",
  default: true,
});

export const audioState = atom({
  key: "audioState",
  default: false,
});

export const roomIdState = atom({
  key: "roomId",
  default: 0,
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
    endAt: new Date(new Date(2022, 11, 32) + 3240 * 10000).toISOString().split("T")[0],
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
