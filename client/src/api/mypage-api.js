import axiosInstance from "./axios_config";

export const getTimeRecordList = async (date) => {
  const response = await axiosInstance({
    url: "/time-record",
    params: { date },
  });
  return response;
};
