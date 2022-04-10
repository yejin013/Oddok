import axiosInstance from "./axios_config";

export const createSession = async (userId, roomInfo) => {
  const response = await axiosInstance.post(
    "/study-room",
    {
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
    { headers: { userId } },
  );
  return response;
};

export const createToken = async (userId, roomId) => {
  const response = await axiosInstance.get(`/study-room/join/${roomId}`, {
    headers: { userId },
  });
  return response;
};

export const saveTime = async (timeInfo) => {
  const response = await axiosInstance.post("/time-record", {
    startTime: timeInfo.startTime,
    endTime: timeInfo.endTime,
    subject: timeInfo.subject,
  });
  return response;
};
