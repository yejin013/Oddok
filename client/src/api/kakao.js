export const kakaoConfig = {
  clientId: process.env.REACT_APP_KAKAO_API_KEY,
  clientSecret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
  redirectURL: process.env.REACT_APP_KAKAO_REDIRECT_URL,
};

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoConfig.clientId}&redirect_uri=${kakaoConfig.redirectURL}&response_type=code`;
