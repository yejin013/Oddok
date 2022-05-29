import axios from "axios";
import axiosInstance from "./axios-config";

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

export const leaveStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/leave/${roomId}`,
  });
  return response;
};

export const getStudyRoomList = async (page, sort, isPublic, category, name, hashtag) => {
  const response = await axios.get("/study-room/search", {
    params: { page, sort, isPublic, category, name, hashtag },
  });
  return response.data;
};
