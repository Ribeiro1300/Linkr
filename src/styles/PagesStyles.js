import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #696969;
  margin-top: 70px;
  display: flex;
  min-height: 100vh;
  justify-content: center;
`;

const PageTitle = styled.h2`
  font-size: 32px;
  font-family: "Oswald", sans-serif;
  color: white;
  margin-bottom: 50px;
`;
const Content = styled.div`
  width: 620px;
  margin-top: 60px;
`;
const NewPost = styled.div`
  width: 100%;
  height: 210px;
  background-color: #ffff;
  border-radius: 10px;
  margin-bottom: 30px;
`;

export { Container, PageTitle, Content, NewPost };
