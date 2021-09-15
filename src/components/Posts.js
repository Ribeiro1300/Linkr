import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
// import ReactHashtag from "react-hashtag";

export default function Posts({ postsList }) {
  const history = useHistory();
  return (
    <>
      {postsList.map((info) => (
        <Post key={info.id}>
          <ProfileAndLikes>
            <Link to={"/user/" + info.user.id}>
              <img src={info.user.avatar}></img>
            </Link>
            {info.likes.length}
          </ProfileAndLikes>
          <PostData>
            <h3>{info.user.username}</h3>
            {/* <ReactHashtag
              onHashtagClick={(val) => history.push("/hashtag/" + val)}
            >
              {info.text}
            </ReactHashtag> */}
            <LinkInfo>
              <a href={info.link} target="_blank">
                <LinkTexts>
                  <h4>{info.linkTitle}</h4>
                  <p>{info.linkDescription}</p>
                  <p>{info.link}</p>
                </LinkTexts>
                <img src={info.linkImage}></img>
              </a>
            </LinkInfo>
          </PostData>
        </Post>
      ))}
    </>
  );
}

const Post = styled.div`
  font-family: "Lato", sans-serif;
  display: flex;
  width: 100%;
  background-color: #171717;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #ffff;
  padding: 10px;
`;
const ProfileAndLikes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100px;
  img {
    width: 70px;
    height: 70px;
    border-radius: 100px;
    margin-top: 10px;
  }
`;
const PostData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LinkInfo = styled.div`
  img {
    width: 100px;
    border-radius: 10px;
  }
  a {
    text-decoration: none;
    color: currentColor;
    border: 1px solid #4d4d4d;
    border-radius: 10px;
    display: flex;
  }
`;
const LinkTexts = styled.div``;
