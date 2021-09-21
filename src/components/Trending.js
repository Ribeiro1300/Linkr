import { useHistory } from "react-router";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getTrendingHashtags } from "./Api";

export default function Trending() {

  const history = useHistory();

  const [trendingHashtags, setTrendingHashtags] = useState([]); 
  const [searchHashtag, setSearchHashtag] = useState(); 

  useEffect(() => {

    getTrendingHashtags()
      .then((res) => setTrendingHashtags(res.data.hashtags))
      .catch((err) =>
        alert("Houve uma falha ao obter as trending hashtags, por favor atualize a página")
      );

  }, []); 

  return (
    <TrendingContainer>
      <TrendingBox>
        <TrendingText>trending</TrendingText>
        <Line/>
          {trendingHashtags.map( trendingHashtags => <HashtagText onClick={ () => history.push(`/hashtag/:${trendingHashtags.name}`) }>
            # {trendingHashtags.name}</HashtagText> )}
        <SearchHashtagBox>
          <HashtagIcon>#</HashtagIcon>
          <form onSubmit={() => history.push(`/hashtag/:${searchHashtag}`)} >
            <HashtagInput 
            placeholder="type a hashtag" 
            type="text" 
            value={searchHashtag}
            onChange={(e) => setSearchHashtag(e.target.value)}/>
          </form>
        </SearchHashtagBox>
      </TrendingBox>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 300px;
  position: relative;
  @media (max-width: 1040px) {
    display: none;
  }
`;

const TrendingBox = styled.div`
  position: fixed;
  width: 300px;
  height: auto;
  background-color: #171717;
  border-radius: 10px;
  top: 210px;
  margin-left: 30px;
  padding-bottom: 20px;
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
  margin-bottom: 10px;
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

const SearchHashtagBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 10px;
  font-family: Lato;
  font-weight: bold;
  color: #FFFFFF;
  font-size: 19px;
`;

const HashtagIcon = styled.div`
  position: absolute;
  top: 7px;
  left: 25px;
`;

const HashtagInput = styled.input`
  width: 269px;
  height: 35px;
  background: #252525;
  border-radius: 8px;
  border: none;
  padding-left: 30px;
  padding-bottom: 7px;
  font-family: Lato;
  font-weight: bold;
  color: #FFFFFF;
  font-size: 19px;
  ::placeholder {
    font-family: Lato;
    font-style: italic;
    font-weight: normal;
    font-size: 16px;
    color: #575757;
  }
`;