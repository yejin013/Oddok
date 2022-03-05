import React from "react";
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
}

export default App;
