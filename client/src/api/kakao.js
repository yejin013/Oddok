export const kakaoConfig = {
  clientId: process.env.REACT_APP_KAKAO_API_KEY,
  clientSecret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
  redirectURL: process.env.REACT_APP_KAKAO_REDIRECT_URL,
  logoutRedirectURL: process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URL,
};

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoConfig.clientId}&redirect_uri=${kakaoConfig.redirectURL}&response_type=code`;
export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoConfig.clientId}&logout_redirect_uri=${kakaoConfig.logoutRedirectURL}`;
