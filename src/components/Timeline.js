import { Container, PageTitle, Content, NewPost } from "../styles/PagesStyles";
import Posts from "./Posts";
import { getPosts } from "./TestData";

export default function Timeline() {
  const allPosts = getPosts;

  return (
    <Container>
      <Content>
        <PageTitle>timeline</PageTitle>
        <NewPost></NewPost>
        <Posts postsList={allPosts} />
      </Content>
    </Container>
  );
}
