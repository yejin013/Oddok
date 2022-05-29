import axiosInstance from "./axios-config";

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
