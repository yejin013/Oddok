import axios from "axios";
import axiosInstance from "./axios-config";
import { kakaoConfig } from "./kakao";

const formUrlEncoded = (x) => Object.keys(x).reduce((p, c) => `${p}&${c}=${encodeURIComponent(x[c])}`, "");

export const getKakaoToken = async (code) => {
  const response = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    formUrlEncoded({
      grant_type: "authorization_code",
      client_id: kakaoConfig.clientId,
      redirect_uri: kakaoConfig.redirectURL,
      code,
      client_secret: kakaoConfig.clientSecret,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  return response;
};

export const login = async (token) => {
  axios.defaults.withCredentials = true; // refreshToken을 쿠키로 받기 위해 설정
  await axios
    .get(`/auth?token=${token}`)
    .then((response) => {
      const accessToken = response.data.accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    })
    .catch((error) => console.error("login error", error));
};

export const getNewToken = async () => {
  const response = await axiosInstance.get("/user/refresh");
  return response;
};

export const logout = async () => {
  const response = await axiosInstance.get("/auth/logout");
  return response;
};
