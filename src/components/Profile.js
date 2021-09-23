import { Container, Content, PageTitle } from "../styles/PagesStyles";
import Trending from "./Trending";
import Posts from "./Posts";
import Loader from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserPosts,getFollowedUsers } from "./Api";
import FollowButton from "./FollowButton";
import styled from "styled-components";

export default function Profile() {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [usersPosts, setUsersPosts] = useState([]);
  const [followedUsers, setUserFollowed] = useState()
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      alert("Faça login antes!");
      history.push("/");
      return;
    }
    getFollowedUsers()
      .then(res => setUserFollowed(res.data.users))
        .catch(err => alert(err.request.response))
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
        <UserProfile>
          <PageTitle>{usersPosts[0].user.username + "'s posts"}</PageTitle>
          <FollowButton userId={id} followers={followedUsers}/>
        </UserProfile>
        
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

const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;