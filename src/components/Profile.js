import { Container, Content, PageTitle } from "../styles/PagesStyles";
import Trending from "./Trending";
import Posts from "./Posts";
import Loader from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { getUserPosts } from "./Api";

export default function Profile() {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [usersPosts, setUsersPosts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      alert("Faça login antes!");
      history.push("/");
      return;
    }
    getUserPosts(id)
      .then((res) => {
        setUsersPosts(res.data.posts);
      })
      .catch();
    setIsLoading(false);
  }, [reload]);

  function CheckPosts() {
    return usersPosts.length === 0 ? (
      <h2>Nenhum post encontrado</h2>
    ) : (
      <>
        <PageTitle>{usersPosts[0].user.username + "'s posts"}</PageTitle>
        <Posts postsList={usersPosts} setReload={setReload}/>
      </>
    );
  }
  return (
    <Container>
      <Content>
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
