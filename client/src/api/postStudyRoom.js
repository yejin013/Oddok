import axiosInstance from "./axios_config";

const postStudyRoom = async (data) => {
  const response = await axiosInstance({
    url: "/study-room",
    method: "POST",
    data,
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

export default postStudyRoom;
