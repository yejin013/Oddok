import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "@pages/CreateRoom";
import JoinRoom from "@pages/JoinRoom";
import MainHome from "@pages/MainHome/MainHome";
import Search from "@pages/Search/Search";
import MyPage from "@pages/MyPage/MyPage";
import StudyRoom from "@pages/StudyRoom/StudyRoom";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import { ErrorModal } from "@components/commons";

function App() {
  return (
    <BrowserRouter>
      <ErrorModal />
      <Switch>
        <Route exact path="/">
          <MainHome />
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
  );
}

export default App;
