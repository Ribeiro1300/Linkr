import styled from "styled-components";

export default function Trending() {
  return <TrendingBox></TrendingBox>;
}

const TrendingBox = styled.div`
  position: fixed;
  width: 300px;
  height: 400px;
  background-color: #171717;
  border-radius: 10px;
  top: 218px;
  left: 1125px;

  @media (max-width: 375) {
    display: none;
  }
`;
