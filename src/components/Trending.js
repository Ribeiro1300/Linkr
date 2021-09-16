import styled from "styled-components";
import React from "react";
export default function Trending() {
  return <TrendingBox></TrendingBox>;
}

const TrendingBox = styled.div`
  position: fixed;
  width: 200px;
  height: 400px;
  background-color: #171717;
  border-radius: 10px;
  top: 200px;
  left: 80%;

  @media (max-width: 1040px) {
    display: none;
  }
`;
