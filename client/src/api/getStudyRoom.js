import axiosInstance from "./axios_config";

const getStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/join/${roomId}`,
    method: "get",
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

export default getStudyRoom;
