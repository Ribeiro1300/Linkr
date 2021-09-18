import { Container, Content, PageTitle } from "../styles/PagesStyles";
import Trending from "./Trending";
import Posts from "./Posts";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { getMyPosts } from "./Api";

export default function MyPosts() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      alert("Faça login antes!");
      history.push("/");
      return;
    }
    getMyPosts()
      .then((res) => {
        setMyPosts(res.data.posts);
      })
      .catch();
    setIsLoading(false);
  }, []);
  return (
    <Container>
      <Content>
        <PageTitle>My posts</PageTitle>
        <Posts postsList={myPosts} />
      </Content>
      <Trending />
    </Container>
  );
}
