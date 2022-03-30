import { atom } from "recoil";

export const hourState = atom({
  key: "hourState",
  default: 0,
});

export const minuteState = atom({
  key: "minuteState",
  default: 0,
});

export const secondState = atom({
  key: "secondState",
  default: 0,
});

export const totalHourState = atom({
  key: "totalHourState",
  default: 0,
});

export const totalMinuteState = atom({
  key: "totalMinuteState",
  default: 0,
});

export const totalSecondState = atom({
  key: "totalSecondState",
  default: 0,
});
