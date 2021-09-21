import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import LikeButton from "./LikeButton";
import EditPost from "./EditPost";

export default function Posts({ postsList }) {
  const history = useHistory();

  const userID = localStorage.getItem("userID");

  return (
    <>
      {postsList.map((info,index) => (
        <Post key={info.id}>
          <ProfileAndLikes>
            <Link to={"/user/" + info.user.id}>
              <img src={info.user.avatar}></img>
            </Link>
            <LikeButton info={info} id={'likeContainer-'+index} index={index}/>
          </ProfileAndLikes>
          <PostData>
            <h3>{info.user.username}</h3>
            {info.user.id === userID ? (
              <EditPost info={info}/>
              ) : (
              <ReactHashtag
                onHashtagClick={(val) =>
                  history.push("/hashtag/:" + val.slice(1))
                }
              >
                {info.text}
              </ReactHashtag> )
            }
            <LinkInfo href={info.link} target="_blank">
              <LinkTexts>
                <h4>{info.linkTitle}</h4>
                <p>{info.linkDescription}</p>
                <p>{info.link}</p>
              </LinkTexts>
              <img src={info.linkImage}></img>
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
  width: 15%;
  img {
    width: 70px;
    border-radius: 100px;
    margin-top: 10px;
  }
`;
const PostData = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  flex-direction: column;
  justify-content: center;
`;

const LinkInfo = styled.a`
  display: flex;
  width: 100%;
  text-decoration: none;
  color: currentColor;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
  img {
    width: 100px;
    border-radius: 10px;
  }
`;
const LinkTexts = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
