// font-family: 'Lato', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Passion One', cursive;

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #333333;
  margin-top: 72px;
  display: flex;
  justify-content: center;
`;

const PageTitle = styled.h2`
  font-size: 43px;
  font-weight: bold;
  font-family: "Oswald", sans-serif;
  color: white;
  margin-bottom: 50px;
`;
const Content = styled.div`
  width: 935px;
  margin-top: 53px;
  padding-right: 325px;
`;
const NewPost = styled.div`
  width: 100%;
  height: 210px;
  background-color: #ffff;
  border-radius: 10px;
  margin-bottom: 30px;
`;

export { Container, PageTitle, Content, NewPost };
