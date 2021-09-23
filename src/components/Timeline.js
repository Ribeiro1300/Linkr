import { Container, PageTitle, Content, NewPost } from "../styles/PagesStyles";
import Posts from "./Posts";
import Trending from "./Trending";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { getFollowedUsersPosts, getFollowedUsers } from "./Api";
import CreatePost from "./CreatePost";

export default function Timeline() {
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [msg, setMsg] = useState("Nenhuma publicação encontrada");
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      alert("Faça login antes!");
      history.push("/");
      return;
    }

    let followedUsers = [];
    getFollowedUsers().then((res) => {
      followedUsers = res;
    });
    console.log(followedUsers);

    if (followedUsers == []) {
      setMsg("Você não segue ninguém ainda, procure por perfis na busca");
      return;
    }
    getFollowedUsersPosts()
      .then((res) => setAllPosts(res.data.posts))
      .catch((err) =>
        alert("Houve uma falha ao obter os posts, por favor atualize a página")
      );
    setIsLoading(false);
  }, []);

  function CheckPosts() {
    return allPosts.length === 0 ? (
      <h2>{msg}</h2>
    ) : (
      <Posts postsList={allPosts} />
    );
  }
  return (
    <Container>
      <Content>
        <PageTitle>Timeline</PageTitle>
        <NewPost>
          <CreatePost />
        </NewPost>
        {isLoading ? (
          <Loader type="Bars" color="#00BFFF" height={80} width={80} />
        ) : (
          CheckPosts()
        )}
      </Content>
      <Trending />
    </Container>
  );
}
