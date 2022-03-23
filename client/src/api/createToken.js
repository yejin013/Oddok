import axiosInstance from "./axios_config";

const createToken = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/join/${roomId}`,
    method: "post",
    data: { roomId },
  });
  return response;
};

axiosInstance.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    // eslint-disable-next-line no-param-reassign
    config.headers.userId = userId;
  }
  return config;
});

export default createToken;
