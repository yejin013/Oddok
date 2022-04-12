import { atom } from "recoil";

export const planState = atom({
  key: "planState",
  default: [
    { id: 1, name: "영어회화 1장" },
    { id: 2, name: "영어회화 2장" },
    { id: 3, name: "영어회화 3장" },
    { id: 4, name: "영어회화 4장" },
    { id: 5, name: "영어회화 5장" },
  ],
});

export const selectedPlanState = atom({
  key: "selectedPlanState",
  default: { id: 0, name: "목표를 입력해주세요" },
});
