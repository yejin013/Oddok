import axiosInstance from "./axios-config";

export const saveTime = async (timeInfo) => {
  const response = await axiosInstance.post("/time-record", timeInfo);
  return response;
};
