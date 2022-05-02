/* eslint-disable import/prefer-default-export */
import axios from "axios";
import axiosInstance from "./axios_config";

export const createStudyRoom = async (roomInfo) => {
  const response = await axiosInstance({
    url: "/study-room",
    method: "POST",
    data: roomInfo,
  });
  return response;
};

export const getStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/${roomId}`,
  });
  return response;
};

export const joinStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/join/${roomId}`,
  });
  return response;
};

export const updateStudyRoom = async (roomId, newRoomInfo) => {
  const response = await axiosInstance({
    url: `/study-room/${roomId}`,
    method: "PUT",
    data: newRoomInfo,
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

export const getStudyRoomList = async (page, sort, isPublic, category, name, hashtag) => {
  const response = await axios.get("/study-room", {
    params: { page, sort, isPublic, category, name, hashtag },
  });
  return response.data;
};

export const getBookmark = async () => {
  const response = await axiosInstance.get("/bookmark");
  return response;
};

export const addBookmark = async (roomId) => {
  const response = await axiosInstance.post(`/bookmark/${roomId}`);
  return response;
};

export const deleteBookmark = async () => {
  const response = await axiosInstance.delete("/bookmark");
  return response;
};
