import React from "react";
import ReactDOM from "react-dom";
import Admin from "./layout/layout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./css/custom.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/cpu" render={(props) => <Admin {...props} />} />
      <Redirect from="/" to="/cpu/cpu-calculator" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
