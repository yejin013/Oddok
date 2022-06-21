import axiosInstance from "./axios-config";

export const saveTime = async (timeInfo) => {
  const response = await axiosInstance({
    url: "/time-record",
    method: "POST",
    data: timeInfo,
  });
  return response;
};
