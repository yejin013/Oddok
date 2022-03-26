import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import SettingRoom from "./components/study/settting_room/setting_room";
import CreateRoom from "./pages/create_room";
import JoinRoom from "./pages/join_room";
import StudyRoom from "./pages/study_room/study_room";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create" component={CreateRoom} />
        <Route exact path="/studyroom" component={JoinRoom} />
        <Route path="/studyroom/:id" component={StudyRoom} />
        {/* <Route exact path="/study-room">
          <SettingRoom />
        </Route>
        <Route path="/study-room/:id">
          <StudyRoom />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
