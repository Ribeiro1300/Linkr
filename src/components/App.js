import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopBar from "./TopBar";
import Login from "./Login";
import Timeline from "./Timeline";
import Profile from "./Profile";
import Signup from "./Signup";
import Hashtag from "./Hashtag";
import MyLikes from "./MyLikes";
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
        </Route>
        <Route path="/user/:id" exact>
          <TopBar />
          <Profile />
        </Route>
        <Route path="/hashtag/:hashtagName" exact>
          <TopBar />
          <Hashtag />
        </Route>
        <Route path="/my-likes">
          <TopBar />
          <MyLikes />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
