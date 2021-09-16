import { Container, PageTitle, Content, NewPost } from "../styles/PagesStyles";
import Posts from "./Posts";
import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { getPosts } from "./Api";

export default function Timeline() {
  const [isLoading, setIsLoading] = useState(true);
  let allPosts;
  useEffect(() => {
    getPosts()
      .then((res) => {
        allPosts = res.data.posts;
        setIsLoading(false);
      })
      .catch(
        alert("Houve uma falha ao obter os posts, por favor atualize a página")
      );
  }, []);

  function CheckPosts() {
    return allPosts.length == 0 ? (
      <h2>Nenhum post encontrado</h2>
    ) : (
      <Posts postsList={allPosts} />
    );
  }
  return (
    <Container>
      <Content>
        <PageTitle>Timeline</PageTitle>
        <NewPost></NewPost>
        {isLoading ? (
          <Loader type="Bars" color="#00BFFF" height={80} width={80} />
        ) : (
          CheckPosts()
        )}
      </Content>
    </Container>
  );
}
