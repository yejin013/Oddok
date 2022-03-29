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
