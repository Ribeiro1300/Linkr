import { useHistory } from "react-router";
import styled from "styled-components";

export default function Trending() {

  const history = useHistory();

  const trendingHashtags = [
        {
            "id": 2,
            "name": "barato",
            "numberOfMentions": 2
        },
        {
            "id": 4,
            "name": "aquelehashtaggigantecommuuuitocaracteresparaversequebraalgo",
            "numberOfMentions": 1
        },
        {
            "id": 1,
            "name": "drivencademeusdados",
            "numberOfMentions": 1
        },
        {
            "id": 5,
            "name": "teste",
            "numberOfMentions": 1
        },
        {
            "id": 3,
            "name": "utilidadepublica",
            "numberOfMentions": 1
        }
  ];

  return (
    <TrendingBox>
      <TrendingText>trending</TrendingText>
      <Line/>
        {trendingHashtags.map( trendingHashtags => <HashtagText onClick={ () => history.push(`/hashtag/:${trendingHashtags.name}`) }># {trendingHashtags.name}</HashtagText> )}
    </TrendingBox>
  );
}

const TrendingBox = styled.div`
  position: fixed;
  width: 300px;
  height: auto;
  background-color: #171717;
  border-radius: 10px;
  top: 218px;
  left: 1125px;
  padding-bottom: 20px;

  @media (max-width: 375) {
    display: none;
  }
`;

const TrendingText = styled.h1`
  font-family: Oswald;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  color: #FFFFFF;
  line-height: 33px;
  margin: 9px 16px 12px 16px;
`;

const Line = styled.div`
  width: 100%;
  height: 0px;
  border: 1px solid #484848;
  margin-bottom: 22px;
`;

const HashtagText = styled.h2`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 30px;
  letter-spacing: 0.05em;
  color: #FFFFFF;
  margin: 0 16px 0 16px;
  word-break: break-all;
  cursor: pointer;
`;