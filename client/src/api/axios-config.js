/* eslint-disable no-param-reassign */
import axios from "axios";
import { getNewToken } from "./auth/auth-api";
import ApiError from "./error/ApiError";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
  timeout: 30000,
  header: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    // console.log("😵응답 에러", error.response);
    const { config, response } = error;
    if (response.status === 401 && response.data.message === "로그인이 되어 있지 않습니다.") {
      await getNewToken();
      return axiosInstance.request(config);
    }
    throw new ApiError(error.response.data.message, error.response.status);
  },
);

export default axiosInstance;
