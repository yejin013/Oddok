/* eslint-disable no-param-reassign */
import axios from "axios";

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
  (res) => {
    console.log("🙂응답 성공", res);
    return res.data;
  },
  (error) => {
    console.log("😵응답 에러", error);
    throw error;
  },
);

export default axiosInstance;
