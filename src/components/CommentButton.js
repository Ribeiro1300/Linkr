import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { DislikePost, getComments, LikePost } from "./Api";
import ReactTooltip from 'react-tooltip';
import { AiOutlineComment } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";


export default function LikeButton ({info,index}) {

    const history = useHistory();

    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("auth")) {
          alert("Faça login antes!");
          history.push("/");
          return;
        }

        getComments(info.id)
            .then(res => setComments(res.data.comments))
            
            .catch(err => console.log(err))

       console.log(comments)
    }, []);


    return (
        <CommentIconBox>
            <AiOutlineComment/>
            <p>{comments.length} comments</p>
        </CommentIconBox>
    )
}

const CommentIconBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin-top: 5px;
    p {
        margin-top: 3px;
        font-family: Lato;
        font-style: normal;
        font-weight: normal;
        font-size: 11px;
        text-align: center;
        color: #FFFFFF; 
    }
`;