import axios from "axios";
import axiosInstance from "@api/axios-config";
import StudyRoomError from "@api/error/StudyRoomError";
import { MESSAGE } from "@utils/constants/API_ERROR";

export const createStudyRoom = async (roomInfo) => {
  try {
    const response = await axiosInstance({
      url: "/study-room",
      method: "POST",
      data: roomInfo,
    });
    return response;
  } catch (error) {
    throw new StudyRoomError(error, MESSAGE.CREATE_STUDY_ROOM[error.status]);
  }
};

export const joinStudyRoom = async (roomId) => {
  try {
    const response = await axiosInstance({
      url: `/study-room/join/${roomId}`,
    });
    return response;
  } catch (error) {
    throw new StudyRoomError(error, MESSAGE.JOIN_STUDY_ROOM[error.status]);
  }
};

export const startStudyRoom = async (roomInfo) => {
  const { id } = await createStudyRoom(roomInfo);
  const { token } = await joinStudyRoom(id);
  return { id, token };
};

export const updateStudyRoom = async (roomId, newRoomInfo) => {
  try {
    const response = await axiosInstance({
      url: `/study-room/${roomId}`,
      method: "PUT",
      data: newRoomInfo,
    });
    return response;
  } catch (error) {
    throw new StudyRoomError(error, MESSAGE.UPDATE_STUDY_ROOM[error.status]);
  }
};

export const leaveStudyRoom = async (roomId) => {
  try {
    const response = await axiosInstance({
      url: `/study-room/leave/${roomId}`,
    });
    return response;
  } catch (error) {
    throw new StudyRoomError(error, MESSAGE.LEAVE_STUDY_ROOM[error.status]);
  }
};

export const getStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/${roomId}`,
  });
  return response;
};

export const getStudyRoomList = async (page, sort, isPublic, category, name, hashtag) => {
  const response = await axios.get("/study-room/search", {
    params: { page, sort, isPublic, category, name, hashtag },
  });
  return response.data;
};
