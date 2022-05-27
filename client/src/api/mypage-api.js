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

export const createProfile = async (data) => {
  const response = await axiosInstance({
    url: "/profile",
    method: "POST",
    data,
  });
  return response;
};

export const updateProfile = async (data) => {
  const response = await axiosInstance({
    url: "/profile",
    method: "PUT",
    data,
  });
  return response;
};

export const deleteStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/${roomId}`,
    method: "DELETE",
  });
  return response;
};
