import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SettingRoom from "./pages/settting_room/setting_room";
import StudyRoom from "./pages/study_room/study_room";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/study-room">
          <SettingRoom />
        </Route>
        <Route path="/study-room/:id">
          <StudyRoom />
        </Route>
      </Switch>
    </BrowserRouter>
  );
=======
import Example from "./pages/Example";

function App() {
  return <Example />;
>>>>>>> a9e8b5d (feat: openvidu client test)
=======
import SettingRoom from "./pages/SettingRoom";

function App() {
  return <SettingRoom />;
>>>>>>> ce92f33 (feat: 스터디룸 생성 후 입장)
}

export default App;
