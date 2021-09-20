import { Container, PageTitle, Content, NewPost } from "../styles/PagesStyles";
import Posts from "./Posts";
import Loader from "react-loader-spinner";
import Trending from "./Trending";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { getHashtagPosts, sendCreatePost } from "./Api";
import styled from "styled-components";

export default function CreatePost() {

    const [avatar,setAvatar] = useState('');

    const [postURL,setPostURL] = useState('');
    const [postDescription,setPostDescription] = useState('');

    const history = useHistory();

    useEffect(() => {
        setAvatar( JSON.parse(localStorage.getItem('user')).avatar );
    }, []);

    function publishPost (event) {

        event.preventDefault();

        const body = {
            text: postDescription,
            link: postURL
        }

        const promise = sendCreatePost(body)
            promise
                .then(res => history.push("/timeline"))
                .catch(err => alert(JSON.parse(err.request.response).message))
            return

    }

  return (
    <CreatePostBox>
        <UserAvatar src={avatar} />
        <InfoBox>
            <p>O que você tem pra favoritar hoje?</p>
            <form onSubmit={publishPost}>
                <LinkInput type="url" name="postURL" placeholder="http://..." onChange={(e) => setPostURL(e.target.value)} value={postURL} required />
                <DescriptionInput type="text" name="postDescription" onChange={(e) => setPostDescription(e.target.value)} value={postDescription} placeholder="Descrição" wrap="soft"/>
                <PublishButton type="submit" >Publicar</PublishButton>
            </form>
        </InfoBox>
    </CreatePostBox>
  );
}

const CreatePostBox = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px 22px 16px 18px;
    justify-content: space-between;
    gap: 18px;
`;

const UserAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    font-family: Lato;
    font-style: normal;
    p {
        font-weight: 300;
        font-size: 20px;
        line-height: 28px;
        color: #707070;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
        input, textarea {
            font-family: Lato;
            font-style: normal;
            font-weight: 300;
            font-size: 20px;
            line-height: 28px;
            width: 100%;
            background: #EFEFEF;
            border-radius: 5px;
            border: none;
            padding-left: 10px;
            font-size: 15px;
            line-height: 18px;
            word-break: break-all;
            ::placeholder {
                color: #949494;
                }
        }
    }
`;

const LinkInput = styled.input`
    height: 30px;
`;

const DescriptionInput = styled.textarea`
    height: 66px;
`;

const PublishButton = styled.button`
    align-self: flex-end;
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    text-align: center;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
`;