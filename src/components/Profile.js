import { Container, PageTitle, Content, NewPost } from "../styles/PagesStyles";
import { useParams } from "react-router-dom";
import Posts from "./Posts";
import React from "react";

export default function Profile() {
  const { id } = useParams();
  return (
    <Container>
      <Content>
        {/* <PageTitle>{userPosts[0].user.username + "'s posts"}</PageTitle>
        <Posts postsList={userPosts} /> */}
      </Content>
    </Container>
  );
}
