import {
  Container,
  PageTitle,
  Content,
  NewPost,
  Posts,
} from "../styles/PagesStyles";

export default function Feed() {
  return (
    <Container>
      <Content>
        <PageTitle>Timeline</PageTitle>
        <NewPost></NewPost>
        <Posts></Posts>
      </Content>
    </Container>
  );
}
