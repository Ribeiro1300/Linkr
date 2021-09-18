import { Container, Content, PageTitle } from "../styles/PagesStyles";
import Trending from "./Trending";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

export default function Hashtag() {
  const history = useHistory();
  const { hashtagName } = useParams();
  return (
    <Container>
      <Content>
        <PageTitle>{hashtagName}</PageTitle>
      </Content>
      <Trending />
    </Container>
  );
}
