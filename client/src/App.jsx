import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "@pages/create_room";
import JoinRoom from "@pages/join_room";
import MainHome from "@pages/main_home/main_home";
import Search from "@pages/search/search";
import MyPage from "@pages/MyPage/MyPage";
import StudyRoom from "@pages/study_room/study_room";
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
