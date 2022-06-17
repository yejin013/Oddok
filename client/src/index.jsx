import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import axios from "axios";
import App from "./App";
import "./index.css";
import "./assets/styles";

// axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root"),
);
