import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopBar from "./TopBar";
import Login from "./Login";
import Timeline from "./Timeline";
import Trending from "./Trending";
import Profile from "./Profile";
import Signup from "./Signup";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/signUp" exact>
          <Signup />
        </Route>
        <Route path="/timeline">
          <TopBar />
          <Timeline />
          <Trending />
        </Route>
        <Route path="/user/:id" exact>
          <TopBar />
          <Profile />
          <Trending />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
