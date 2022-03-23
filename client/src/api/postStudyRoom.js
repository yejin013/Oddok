import axiosInstance from "./axios_config";

const postStudyRoom = async (data) => {
  const response = await axiosInstance({
    url: "/study-room",
    method: "POST",
    data,
  });
  return response;
};

export default postStudyRoom;
