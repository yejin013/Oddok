/* eslint-disable import/prefer-default-export */
import axios from "axios";

export const getStudyRoomList = async (page, isPublic, category, sort) => {
  const response = await axios.get("/study-room", {
    params: { page, isPublic, category, sort: [sort, "desc"].join(",") },
  });
  return response.data;
};
