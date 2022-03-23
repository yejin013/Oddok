import axiosInstance from "./axios_config";

const getStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/join/${roomId}`,
    method: "get",
  });
  return response;
};

export default getStudyRoom;
