import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { sendCreatePost } from "./Api";
import styled from "styled-components";
import { IoLocationOutline } from 'react-icons/io5';

export default function CreatePost() {

    const [avatar,setAvatar] = useState('');
    const [postURL,setPostURL] = useState('');
    const [postDescription,setPostDescription] = useState('');
    const [isPublishing, setIsPublishing] = useState(false)
    const [isLocationEnabled,setIsLocationEnabled] = useState(true)
    const history = useHistory();

    useEffect(() => {
        setAvatar( JSON.parse(localStorage.getItem('user')).avatar );
    }, []);

    function publishPost (event) {

        event.preventDefault();
        let usersLocation

        if ( postURL === '' || postURL === null ) {
            alert("Por favor preencha o link que queira compartilhar")
            return
        }

        if (isLocationEnabled) {
            usersLocation = getLocation(setIsLocationEnabled)
        };


        console.log(getLocation(setIsLocationEnabled));


        const promise = sendCreatePost(bodyBuilder(postDescription,postURL))
        promise
            .then(res => {history.push("/");console.log(res);})
            .catch(err => {
                setIsPublishing(false)
                alert("Houve um erro ao publicar seu link")
                alert(err.request.response.message)
            });
        setIsPublishing(true);
    }

  return (
    <CreatePostBox>
        <UserAvatar src={avatar} />
        <InfoBox>
            <p>O que você tem pra favoritar hoje?</p>
            <form onSubmit={publishPost}>
                <LinkInput type="url" name="postURL" placeholder="http://..." onChange={(e) => setPostURL(e.target.value)} value={postURL} required disabled={isPublishing}/>
                <DescriptionInput type="text" name="postDescription" onChange={(e) => setPostDescription(e.target.value)} value={postDescription} placeholder="Descrição" wrap="soft"disabled={isPublishing}/>
                <Location onClick={()=>{setIsLocationEnabled(!isLocationEnabled)}} disabled={!isLocationEnabled}>
                    <IoLocationOutline />
                    {isLocationEnabled?"Localização ativada":"Localização desativada"}
                </Location>
                
                <PublishButton type="submit" disabled={isPublishing}>
                    {isPublishing ? "Publicando" : "Publicar" }
                </PublishButton>
            </form>
        </InfoBox>
    </CreatePostBox>
  );
}


function bodyBuilder(text,link,lat="",long){
    let body = ""
    if (lat === ""){
        body = {
            "text": text,
            "link": link,
        }
    }
    else{
        body = {
            "text": text,
            "link": link,
            "geolocation": {
                "latitude": lat,
                "longitude": long
            }
        }
    }
    return body
}


function getLocation(setIsLocationEnabled){
    let locationValues = {}
    const success = (pos)=>{
        // locationValues = {
        //     latitude: pos.coords.latitude,
        //     longitude: pos.coords.longitude
        // }
        locationValues = pos
        console.log(locationValues);
    }

    const error = ()=>{
        alert("Seu navegador não suporta essa feature");
        setIsLocationEnabled(false);
    }

    navigator.geolocation.getCurrentPosition(success, error);
    return locationValues
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
    :disabled {
        background-color: grey;
    }
`;

const Location = styled.button`
    width: 170px;
    border: none;
    cursor: pointer;
    color: green;
    background-color: white;
    :disabled {
            color: black;
        }
`;