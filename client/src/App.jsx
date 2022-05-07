import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "@pages/create_room";
import JoinRoom from "@pages/join_room";
import MainHome from "@pages/main_home";
import Search from "@pages/search";
import StudyRoom from "@pages/study_room";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainHome} />
        <Route path="/search" component={Search} />
        <Route path="/create" component={CreateRoom} />
        <Route exact path="/studyroom" component={JoinRoom} />
        <Route path="/studyroom/:id" component={StudyRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
