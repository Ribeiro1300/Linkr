import { Container, Content, PageTitle } from "../styles/PagesStyles";
import Trending from "./Trending";
import Posts from "./Posts";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { getUserPosts } from "./Api";

export default function MyPosts() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [usersPosts, setUsersPosts] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      alert("Faça login antes!");
      history.push("/");
      return;
    }
    getUserPosts()
      .then((res) => {
        setUsersPosts(res.data.posts);
      })
      .catch();
    setIsLoading(false);
  }, []);
  return (
    <Container>
      <Content>
        <PageTitle>My posts</PageTitle>
        <Posts postsList={usersPosts} />
      </Content>
      <Trending />
    </Container>
  );
}
