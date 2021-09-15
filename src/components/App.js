import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopBar from "./TopBar";
import Login from "./Login";
import Feed from "./Feed";
import Trending from "./Trending";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/feed">
          <TopBar />
          <Feed />
          <Trending />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
