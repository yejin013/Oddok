import axiosInstance from "./axios_config";

export const getTestUser = async () => {
  const response = await axiosInstance.get("/study-room/user-create");
  return response;
};
