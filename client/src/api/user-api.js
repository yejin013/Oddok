import axiosInstance from "./axios-config";

export const getNickname = async () => {
  const response = await axiosInstance.get("/user/nickname");
  return response;
};
