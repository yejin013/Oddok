/* eslint-disable no-use-before-define */
import axios from "axios";
import { AUTH_ERROR } from "../../utils/constants/API_ERROR";
import axiosInstance from "../axios-config";
import AuthError from "../error/AuthError";
import { kakaoConfig } from "./kakao";

const JWT_EXPIRY_TIME = 6 * 3600 * 1000; // JWT AccessToken 만료시간 (6시간)

const formUrlEncoded = (x) => Object.keys(x).reduce((p, c) => `${p}&${c}=${encodeURIComponent(x[c])}`, "");

export const getKakaoToken = async (code) => {
  try {
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
  } catch (error) {
    throw new AuthError(error, AUTH_ERROR.LOGIN.message, AUTH_ERROR.LOGIN.action);
  }
};

export const getAuthToken = async (token) => {
  try {
    axios.defaults.withCredentials = true; // refreshToken을 쿠키로 받기 위해 설정
    const response = await axios.get(`/auth?token=${token}`);
    return response;
  } catch (error) {
    throw new AuthError(error, AUTH_ERROR.LOGIN.message, AUTH_ERROR.LOGIN.action);
  }
};

export const login = async (code) => {
  const tokens = await getKakaoToken(code);
  const response = await getAuthToken(tokens.data.access_token);
  onLoginSuccess(response);
};

export const getNewToken = async () => {
  try {
    const response = await axios.get("/auth/refresh");
    onLoginSuccess(response);
  } catch (error) {
    throw new AuthError(error);
  }
};

const onLoginSuccess = (response) => {
  const accessToken = response.data.accessToken;
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정

  setTimeout(getNewToken, JWT_EXPIRY_TIME - 60000); // 토큰 만료되기 1분 전에 새로운 토큰 발급 요청
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get("/auth/logout");
    return response;
  } catch (error) {
    throw new AuthError(error, AUTH_ERROR.LOGOUT);
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.get("/auth/leave");
    return response;
  } catch (error) {
    throw new AuthError(error, AUTH_ERROR.DELETE_ACCOUNT.message, AUTH_ERROR.DELETE_ACCOUNT.action);
  }
};
