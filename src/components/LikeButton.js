import { useEffect, useState } from "react";
import styled from "styled-components";
import { DislikePost, LikePost } from "./Api";
import ReactTooltip from 'react-tooltip';
import { AiFillHeart } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";


export default function LikeButton ({info,index}) {

    const userId = JSON.parse(localStorage.getItem("user")).id;
    const [likes, setLikes] = useState(info.likes);
    const [userLiked, setUserLiked] = useState(false);
    const [peopleLikes, setPeopleLikes] = useState('');
    
    useEffect(() => {
        if (likes.filter((item) => item.userId === userId).length !== 0) {
            let peopleLikesString = likes.map(item => item["user.username"] === undefined ? item.username : item["user.username"])
            if (peopleLikesString.includes(JSON.parse(localStorage.getItem("user")).username)) {
                let index = peopleLikesString.indexOf(JSON.parse(localStorage.getItem("user")).username);

                peopleLikesString = validationFunc(peopleLikesString,index,'userLiked')   
            }
            setPeopleLikes(peopleLikesString)
            setUserLiked(true)
        } else {
            let peopleLikesString = likes.map(item => item["user.username"] === undefined ? item.username : item["user.username"])
            peopleLikesString = validationFunc(peopleLikesString,index,'userDisliked')
            setPeopleLikes(peopleLikesString)
            setUserLiked(false)
        }
    },[likes,userLiked])

    function validationFunc (arr, index, type) {
        let newArr = arr;
        if(type === 'userLiked') {
            if (newArr === []) {
                newArr = ''
            } else if (newArr.length === 1) {
                newArr.splice(index,1)
                newArr.splice(0,0,'Você')
                newArr = newArr.join(', ') + ' curtiu esse post';
            } else {
                newArr.splice(index,1)
                newArr.splice(0,0,'Você')
                newArr = newArr.join(', ') + ' curtiram esse post';
            }
            return newArr
        } else {
            if (newArr.length === 0) {
                newArr = 'Ninguem curtiu esse post';
            } else if (newArr.length === 1) {
                newArr = newArr.join(', ') + ' curtiu esse post';
            } else {
                newArr = newArr.join(', ') + ' curtiram esse post';
            }
            return newArr
        }
    }

    function handleLike () {
        const userLiked = likes.filter((item) => item.userId === userId).length;

        if (userLiked === 0) {
            const promise = LikePost(info.id)
            promise
                .then(res => setLikes(res.data.post.likes))
                .catch(err => alert(JSON.parse(err.request.response).message))
            return
        } else {
            const promise = DislikePost(info.id)
            promise
                .then(res => setLikes(res.data.post.likes))
                .catch(err => alert(JSON.parse(err.request.response).message))
            return
        }
        
    }

    return (
        <LikeContainer>
            <IconContext.Provider value={{ color: userLiked ? 'red': 'white', className: "global-class-name" }}>
                <AiFillHeart onClick={() => handleLike()}>{userLiked ? 'dislike': 'like'}</AiFillHeart>
            </IconContext.Provider>
            <p data-tip data-for={'likes-' + index} >{likes.length}</p>
            <ReactTooltip id={'likes-'+ index} place='bottom' effect="solid" type="error">
                {peopleLikes }
            </ReactTooltip>
        </LikeContainer>
    )
}

const LikeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        font-size: 12px;
        margin-top: 3px;
    }
`