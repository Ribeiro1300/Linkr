import { Container, Content, PageTitle } from "../styles/PagesStyles";
import Trending from "./Trending";
import Posts from "./Posts";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { getLikedPosts } from "./Api";

export default function MyLikes() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      alert("Faça login antes!");
      history.push("/");
      return;
    }
    getLikedPosts()
      .then((res) => {
        console.log(res.data.posts);
        setLikedPosts(res.data.posts);
      })
      .catch();
    setIsLoading(false);
  }, []);
  return (
    <Container>
      <Content>
        <PageTitle>Mylikes</PageTitle>
        <Posts postsList={likedPosts} />
      </Content>
      <Trending />
    </Container>
  );
}
