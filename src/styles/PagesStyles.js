// font-family: 'Lato', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Passion One', cursive;

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #696969;
  margin-top: 70px;
  display: flex;
  justify-content: center;
`;

const PageTitle = styled.h2`
  font-size: 32px;
  font-family: "Oswald", sans-serif;
  color: white;
`;
const Content = styled.div`
  width: 620px;
  margin-top: 60px;
`;
export { Container, PageTitle, Content };
