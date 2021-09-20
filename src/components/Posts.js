import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import LikeButton from "./LikeButton";
import { useState } from "react";
import { IoPencilSharp } from "react-icons/io5";

export default function Posts({ postsList }) {
  const history = useHistory();

  const [isEditing, setIsEditing] = useState(false);
  const [isSendingEdit, setIsSendingEdit] = useState(false);

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
          {info.user.id.toString() === localStorage.getItem("userID") ? (
              <EditPost onClick={() => setIsEditing(!isEditing)}>
                <IoPencilSharp size="1em"/>
              </EditPost>
          ) : null}
          <PostData>
            <h3>{info.user.username}</h3>
            {isEditing && info.user.id.toString() === localStorage.getItem("userID") ? 
              (<DescriptionInput type="text" name="postDescription" value={info.text} wrap="soft" disabled={isSendingEdit}/>) : 
              (<ReactHashtag onHashtagClick={(val) => history.push("/hashtag/" + val.slice(1)) }>
                  {info.text}
                </ReactHashtag>
              ) 
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
  position: relative;
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

const EditPost = styled.div`
  position: absolute;
  top: 10px;
  right: 45px;
  cursor: pointer;
`;

const DescriptionInput = styled.textarea`
  margin: 5px 0 5px 0;
  height: 66px;
  resize: none;
  font-family: Lato;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 28px;
  width: 100%;
  background: #EFEFEF;
  resize: none;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
  font-size: 15px;
  line-height: 18px;
  word-break: break-all;
  :disabled {
    background-color: grey;
  }
`;