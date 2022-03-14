import React from "react";
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
}

export default App;
