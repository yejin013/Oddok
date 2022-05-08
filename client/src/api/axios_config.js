/* eslint-disable no-param-reassign */
import axios from "axios";

const axiosInstance = axios.create({
  timeout: 30000,
  header: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  // const userId = localStorage.getItem("userId");
  const userId = "4";
  if (userId) {
    config.headers.userId = userId;
    console.log("🙂header에 userId 설정 성공!!", config.headers.userId);
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
  },
);

export default axiosInstance;
