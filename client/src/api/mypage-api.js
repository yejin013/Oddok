import axiosInstance from "./axios_config";

export const getProfile = async () => {
  const response = await axiosInstance({
    url: "/profile",
  });
  return response;
};

export const getTimeRecordList = async (date) => {
  const response = await axiosInstance({
    url: "/time-record",
    params: { date },
  });
  return response;
};

export const getMyRoom = async () => {
  const id = localStorage.getItem("userId");
  const response = await axiosInstance({
    url: `/study-room/user/${id}`,
  });
  return response;
};
