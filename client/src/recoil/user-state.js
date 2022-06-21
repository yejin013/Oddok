/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: { userId: "", nickname: null, updateAllowed: false },
});
