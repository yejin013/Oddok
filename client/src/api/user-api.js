import axiosInstance from "./axios-config";

export const getNickname = async () => {
  const response = await axiosInstance.get("/user/nickname");
  return response;
};

export const editNickname = async (nickname) => {
  const response = axiosInstance.patch("/user/nickname", {
    nickname,
  });
  return response;
};

export const getUserInfo = async () => {
  const response = await axiosInstance.get("/user/info");
  return response;
};
