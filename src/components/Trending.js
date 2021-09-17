import styled from "styled-components";
import React from "react";
export default function Trending() {
  return (
    <TrendingContainer>
      <TrendingBox></TrendingBox>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 300px;
  position: relative;
`;
const TrendingBox = styled.div`
  position: fixed;
  width: 250px;
  height: 300px;
  background-color: #171717;
  border-radius: 10px;
  top: 210px;
  margin-left: 30px;
  @media (max-width: 1040px) {
    display: none;
  }
`;
