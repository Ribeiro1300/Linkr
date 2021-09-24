import { Container, PageTitle, Content, NewPost } from "../styles/PagesStyles";
import Posts from "./Posts";
import Trending from "./Trending";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { getPosts } from "./Api";
import CreatePost from "./CreatePost";

export default function Timeline() {
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const history = useHistory();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      alert("Faça login antes!");
      history.push("/");
      return;
    }
    let id = setInterval(() => {
      getPosts()
        .then((res) => setAllPosts(res.data.posts))
        .catch((err) =>
          alert(
            "Houve uma falha ao obter os posts, por favor atualize a página"
          )
        );
      setIsLoading(false);
    }, 15000);
    return () => clearInterval(id);
  }, [reload]);

  function CheckPosts() {
    return allPosts.length === 0 ? (
      <h2>Nenhum post encontrado</h2>
    ) : (
      <Posts postsList={allPosts} setReload={setReload} />
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
