/* eslint-disable import/prefer-default-export */
import axios from "axios";

export const getStudyRoomList = async (page, isPublic, sort) => {
  const response = await axios.get("/study-room", { params: { page, isPublic, sort } });
  return response.data;
};
