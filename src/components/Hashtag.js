import { Container } from "../styles/PagesStyles";
import { useHistory, useParams } from "react-router";
export default function Hashtag() {
  const history = useHistory();
  const { hashtag } = useParams();
  return (
    <Container>
      <h1>{hashtag}</h1>
    </Container>
  );
}
