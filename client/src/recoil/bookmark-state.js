import { atom } from "recoil";

export const bookmarkState = atom({
  key: "bookmarkState",
  default: { info: null, isBookmark: false },
});
