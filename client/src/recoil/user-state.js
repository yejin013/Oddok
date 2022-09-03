/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: { isLogin: JSON.parse(localStorage.getItem("isLogin")), id: null, nickname: null, updateAllowed: false },
});
