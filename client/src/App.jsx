import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "@pages/CreateRoom";
import JoinRoom from "@pages/JoinRoom";
import MainHome from "@pages/MainHome/MainHome";
import Search from "@pages/Search/Search";
import MyPage from "@pages/MyPage/MyPage";
import StudyRoom from "@pages/StudyRoom/StudyRoom";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainHome} />
        <Route path="/search" component={Search} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/studyroom/create" component={CreateRoom} />
        <Route exact path="/studyroom/:id/setting" component={JoinRoom} />
        <Route path="/studyroom/:id" component={StudyRoom} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
