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
