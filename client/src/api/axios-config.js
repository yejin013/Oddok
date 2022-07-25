/* eslint-disable no-param-reassign */
import axios from "axios";
import ApiError from "./error/ApiError";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
  timeout: 30000,
  header: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    config.headers.userId = userId;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    // console.log("😵응답 에러", error.response);
    throw new ApiError(error.response.data.message, error.response.status);
  },
);

export default axiosInstance;
