import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
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
import { ErrorModal } from "@components/commons";
import { PrivateRoute, PublicRoute } from "@components/router";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
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
