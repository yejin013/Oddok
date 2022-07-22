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
import { getNewToken } from "@api/auth-api";
import { Loading } from "@components/commons";

function App() {
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(false);

  // 새로고침했을 때도 로그인 상태 계속 유지
  useEffect(async () => {
    if (!user.isLogin) {
      return;
    }
    setIsLoading(true);
    await getNewToken();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <MainHome />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/login/oauth2/code/kakao">
            <RedirectPage />
          </Route>
          <Route path="/logout/oauth2/code/kakao">
            <LogoutRedirectPage />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
          <Route path="/studyroom/create">
            <CreateRoom />
          </Route>
          <Route exact path="/studyroom/:roomId">
            <StudyRoom />
          </Route>
          <Route path="/studyroom/:roomId/setting">
            <JoinRoom />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
