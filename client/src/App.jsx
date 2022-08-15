import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "@pages/CreateRoom";
import JoinRoom from "@pages/JoinRoom";
import MainHome from "@pages/MainHome/MainHome";
import Login from "@pages/Login/Login";
import Search from "@pages/Search/Search";
import MyPage from "@pages/MyPage/MyPage";
import StudyRoom from "@pages/StudyRoom/StudyRoom";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import RedirectPage from "@pages/Login/RedirectPage";
import LogoutRedirectPage from "@pages/LogoutRedirectPage/LogoutRedirectPage";
import { getNewToken } from "@api/auth/auth-api";
import { Loading, ErrorModal } from "@components/commons";
import { PrivateRoute, PublicRoute } from "@components/router";
import styles from "./App.module.css";

function App() {
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(false);

  // 새로고침했을 때도 로그인 상태 계속 유지
  useEffect(() => {
    if (!user.isLogin) return;
    try {
      setIsLoading(true);
      getNewToken();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className={styles.app}>
      {isLoading && <Loading />}
      <BrowserRouter>
        <ErrorModal />
        <Switch>
          <PublicRoute exact path="/" component={MainHome} />
          <PublicRoute restricted exact path="/login" component={Login} />
          <PublicRoute restricted path="/login/oauth2/code/kakao" component={RedirectPage} />
          <PrivateRoute path="/logout/oauth2/code/kakao" component={LogoutRedirectPage} />
          <PublicRoute path="/search" component={Search} />
          <PrivateRoute path="/mypage" component={MyPage} />
          <PrivateRoute path="/studyroom/create" component={CreateRoom} />
          <PrivateRoute path="/studyroom/:roomId/setting" component={JoinRoom} />
          <PrivateRoute path="/studyroom/:roomId" component={StudyRoom} />
          <PublicRoute path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
