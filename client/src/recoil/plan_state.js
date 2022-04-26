import { atom } from "recoil";

export const planState = atom({
  key: "planState",
  default: [],
});

export const selectedPlanState = atom({
  key: "selectedPlanState",
  default: {},
});
