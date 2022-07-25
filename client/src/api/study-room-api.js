import axios from "axios";
import axiosInstance from "./axios-config";
import CreateStudyRoomError from "./error/CreateStudyRoomError";
import JoinStudyRoomError from "./error/JoinStudyRoomError";

export const createStudyRoom = async (roomInfo) => {
  try {
    const response = await axiosInstance({
      url: "/study-room",
      method: "POST",
      data: roomInfo,
    });
    return response;
  } catch (error) {
    throw new CreateStudyRoomError(error);
  }
};

export const getStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/${roomId}`,
  });
  return response;
};

export const joinStudyRoom = async (roomId) => {
  try {
    const response = await axiosInstance({
      url: `/study-room/join/${roomId}`,
    });
    return response;
  } catch (error) {
    throw new JoinStudyRoomError(error);
  }
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
