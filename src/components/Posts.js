import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import ReactHashtag from "react-hashtag";
import LikeButton from "./LikeButton";
import React from "react";
import axios from "axios";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import getYouTubeID from "get-youtube-id";

export default function Posts({ postsList, setReload }) {
  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userID, setPostText] = useState(
    JSON.parse(localStorage.getItem("user")).id
  );

  function deletePost(props) {
    setIsLoading(true);
    axios
      .delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${props}`,
        localStorage.getItem("auth")
      )
      .then(() => {
        setIsOpen(false);
        history.push("/timeline");
      })
      .catch(() => alert("Não foi possível excluir o post, tente novamente!"));
  }

  function setYoutubePlayer (info) {
    const videoId = getYouTubeID(info.link)
    console.log(videoId)
    if (videoId === null) {
      return (
        <LinkInfo href={info.link} target="_blank">
          <LinkTexts>
            <h4>{info.linkTitle}</h4>
            <p>{info.linkDescription}</p>
            <p>{info.link}</p>
          </LinkTexts>
          <img src={info.linkImage}></img>
        </LinkInfo>
      )
    }
    return <iframe src={`https://www.youtube.com/embed/${videoId}`} height='300' allowFullScreen></iframe>
  }

  return (
    <>
      {postsList.map((info, index) => (
        <Post key={info.id}>
          <ProfileAndLikes>
            <Link to={"/user/" + info.user.id}>
              <img src={info.user.avatar}></img>
            </Link>
            <LikeButton
              info={info}
              id={"likeContainer-" + index}
              index={index}
            />
          </ProfileAndLikes>
          <PostData>
              <Link to={"/user/" + info.user.id} style={{ textDecoration: 'none' }}>
                <h3>{info.user.username}</h3>
              </Link>
              {info.user.id.toString() == userID ? (
                <>
                  <DeletePost info={info} />
                  <EditPost info={info} setReload={setReload} />
                </>
              ) : (
                <h5>
                  <ReactHashtag
                    onHashtagClick={(val) =>
                      history.push("/hashtag/:" + val.slice(1))
                    }
                  >
                    {info.text}
                  </ReactHashtag>
                </h5>
              )}
            {setYoutubePlayer(info)}
            
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

  @media (max-width: 413) {
    width: 100%;
  }
`;

const ProfileAndLikes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 15%;

  img {
    width: 70px;
    height: 70px;
    object-fit: fill;
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
  position: relative;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  h3 {
    font-size: 19px;
    color: #FFFFFF;
    margin-bottom: 8px;
    margin-top: 10px;
    word-break: break-word;
  }
  h5 {
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    word-break: break-word;
    margin-bottom: 8px;
    span {
      font-weight: bold;
      color: #FFFFFF;
    }
  }
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