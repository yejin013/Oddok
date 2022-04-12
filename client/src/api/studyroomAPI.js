/* eslint-disable import/prefer-default-export */
import axios from "axios";

export const getStudyRoomList = async (page) => {
  const response = await axios.get("/study-room", { params: { page } });
  return response;
};
