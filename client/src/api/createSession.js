import axiosInstance from "./axios_config";

export const createSession = async (userId, roomInfo) => {
  const response = await axiosInstance({
    url: "/study-room",
    method: "POST",
    data: {
      name: roomInfo,
      category: "일반",
      hashtags: ["교시제", "아침기상", "평일"],
      targetTime: 8,
      limitUsers: 4,
      isPublic: true,
      password: null,
      rule: "떠든 사람 반성문",
      isMicOn: true,
      isCamOn: true,
    },
    headers: { userId },
  });
  return response;
};
/*
axiosInstance.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    // eslint-disable-next-line no-param-reassign
    config.headers.userId = userId;
  }
  return config;
});
*/
// export default createSession;
