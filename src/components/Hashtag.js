import { Container, PageTitle, Content, NewPost } from "../styles/PagesStyles";
import Posts from "./Posts";
import Loader from "react-loader-spinner";
import Trending from "./Trending";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { getHashtagPosts } from "./Api";

export default function Hashtag() {

  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [reload, setReload] = useState(false);

  const history = useHistory();

  let { hashtagName } = useParams();
  hashtagName = hashtagName.substring(1);

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      alert("Faça login antes!");
      history.push("/");
      return;
    }

    getHashtagPosts(hashtagName)
      .then((res) => setAllPosts(res.data.posts))
      .catch((err) =>
        alert("Houve uma falha ao obter os posts, por favor atualize a página")
      );
    setIsLoading(false);
  }, [ hashtagName ]);

  function CheckPosts() {
    return allPosts.length === 0 ? (
      <h2>Nenhum post encontrado</h2>
    ) : (
      <Posts postsList={allPosts} setReload={setReload}/>
    );
  }

  return (
    <Container>
      <Content>
        <PageTitle># {hashtagName}</PageTitle>
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