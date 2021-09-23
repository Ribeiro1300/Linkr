import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import ReactHashtag from "react-hashtag";
import LikeButton from "./LikeButton";
import React from "react";
import axios from "axios";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

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
            <h3>
              {info.user.username}
              {info.user.id.toString() == userID ? (
                <EditWrapper>
                  <DeletePost info={info} />
                  <EditPost info={info} setReload={setReload} />
                </EditWrapper>
              ) : null}
            </h3>
            {
              <ReactHashtag
                onHashtagClick={(val) =>
                  history.push("/hashtag/:" + val.slice(1))
                }
              >
                {info.text}
              </ReactHashtag>
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
  h3 {
    display: flex;
    justify-content: space-between;
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
const EditWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: red;
  position: relative;
`;
