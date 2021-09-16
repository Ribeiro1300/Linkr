import { Container, Content } from "../styles/PagesStyles";
import Trending from "./Trending";
import React from "react";

import { useHistory, useParams } from "react-router";
export default function Hashtag() {
  const history = useHistory();
  const { hashtag } = useParams();
  return (
    <Container>
      <Content>
        <h1>{hashtag}</h1>
      </Content>
      <Trending />
    </Container>
  );
}
