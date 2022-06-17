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
  const response = await axios.get(`/auth?token=${token}`);
  return response;
};

export const getNewToken = async (token) => {
  const response = await axiosInstance.post("/user/refresh");
  return response;
};
