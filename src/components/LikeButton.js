import { useEffect, useState } from "react";
import styled from "styled-components";
import { DislikePost, LikePost } from "./Api";
import ReactTooltip from 'react-tooltip';
import { AiFillHeart } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";


export default function LikeButton ({info,index}) {

    const user = JSON.parse(localStorage.getItem("user"));
    const [likes, setLikes] = useState(info.likes);
    const [userLiked, setUserLiked] = useState(false);
    const [peopleLikes, setPeopleLikes] = useState('');

    useEffect(checkUserLike, [likes, user]);
    useEffect(createTooltipString, [likes, user]);

    
    // useEffect(() => {
    //     // if user has liked the post

    //     if (likes.filter((item) => item.userId === user.id).length !== 0) {
    //         let peopleLikesString = likes.map(item => item["user.username"] === undefined ? item.username : item["user.username"])
    //         if (peopleLikesString.includes(JSON.parse(localStorage.getItem("user")).username)) {
    //             let index = peopleLikesString.indexOf(JSON.parse(localStorage.getItem("user")).username);

    //             peopleLikesString = validationFunc(peopleLikesString,index,'userLiked')   
    //         }
    //         setPeopleLikes(peopleLikesString)
    //         setUserLiked(true)

    //     } else {
    //         let peopleLikesString = likes.map(item => item["user.username"] === undefined ? item.username : item["user.username"])
    //         peopleLikesString = validationFunc(peopleLikesString,index,'userDisliked')
    //         setPeopleLikes(peopleLikesString)
    //         setUserLiked(false)
    //     }
    // },[likes,userLiked])

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

    function checkUserLike() {
        const userHasLiked = likes.filter((item) => item.userId === user.id).length !== 0
        setUserLiked(userHasLiked);
    }

    function createTooltipString() {
        let tooltipString = "";
        const likesAuthorsUsernames = likes.map(like => ("user.username" in like) ? like["user.username"] : like.username);

        if (likesAuthorsUsernames.length === 0) {
            tooltipString = 'Seja o primeiro a curtir isso';
        }else{
            tooltipString = generateStringFromUsernames(likesAuthorsUsernames)
        }

        setPeopleLikes(tooltipString);
    }

    function generateStringFromUsernames(usernames) {
        const SECOND_USERNAME = 1; 
        const THIRD_USERNAME = 2; 
        let tooltipString = "";
        let usernamesList = getFirstThreeUsernames(usernames);

        if (usernames.length > 3) usernamesList[THIRD_USERNAME] = `mais ${usernames.length - 2}`

        for (let index = 0; index < usernamesList.length; index++) {
            if (index === SECOND_USERNAME) tooltipString += (usernamesList.length === 3) ? ', ' : ' e '
            if (index === THIRD_USERNAME && usernamesList.length === 3) tooltipString += ' e '
            tooltipString +=  usernamesList[index]    
        }

        tooltipString += (usernames.length === 1)? " curtiu esse post" : " curtiram esse post"
        return tooltipString
    }

    function getFirstThreeUsernames(usernames) {
        let addedNames = 0;
        let firstThreeUsernames = [];

        if (userLiked){
            firstThreeUsernames.push("Você")
            addedNames++;
        }

        let index = 0;
        do {
            if (usernames[index] !== user.username) {
                firstThreeUsernames.push(usernames[index])
                addedNames++;
            }

            index++;
        } while (addedNames <= 2 && index < usernames.length);

        return firstThreeUsernames;
    }


    function createTooltipStringRefactor3() {
        let tooltipString = "";

        const likesAuthors = likes.map(like => {
            return ("user.username" in like) ? like["user.username"] : like.username
        });

        let likesAuthorsList = [];
        let addedNames = 0;

        if (likesAuthors.includes(user.username)){
            likesAuthorsList.push("Você")
            addedNames++;
        }

        let indexIn = 0;
        do {
            if (likesAuthors[indexIn] !== user.username) {
                likesAuthorsList.push(likesAuthors[indexIn])
                addedNames++;
            }

            indexIn++;
        } while (addedNames <= 2 && indexIn < likesAuthors.length);


        if (likesAuthorsList.length === 1) {
            tooltipString = `${likesAuthorsList[0]} curtiu esse post`

        }else if (likesAuthorsList.length <= 3 && likesAuthors.length <= 3) {
            for (let i = 0; i < likesAuthorsList.length; i++) {
                tooltipString += i < likesAuthorsList.length - 1 ? `${likesAuthorsList[i]}` : `e ${likesAuthorsList[i]}`;
                tooltipString += likesAuthorsList.length === 3 && i === 0 ? ', ' : ' '
            }

        }else{
            for (let i = 0; i <= 2; i++) {
                tooltipString += `${likesAuthorsList[i]}, `;
            }
            tooltipString += `e mais ${likesAuthors.length - 3} curtiram esse post`
        }

        setPeopleLikes(tooltipString);
    }

    function createTooltipStringRefactor2() {
        let tooltipString = "";
        let addedNames = 0;

        const likesAuthors = likes.map(like => {
            return ("user.username" in like) ? like["user.username"] : like.username
        });


        if (likesAuthors.length <= 3) {
            if (userLiked){
                tooltipString = "Você"
                addedNames++;
            }

            let index = 0;
            do {
                if (likesAuthors[index] !== user.username) {
                    tooltipString += addedNames <= 1 ? `, ${likesAuthors[index]} ` : `e ${likesAuthors[index]}`;
                    addedNames++;
                }
                index++;

                console.log("testando meu loop", {addedNames, namesLenght: likesAuthors.length, bool: addedNames <= 2 || index === likesAuthors.length});
            } while (addedNames <= 2 && index < likesAuthors.length);

        }else{
            tooltipString = "aqui"
        }

        setPeopleLikes(tooltipString);
    }

    function createTooltipStringRefactor1() {
        /*
        até 3 curtidas (incluindo o user)
            eu curti / eu não curti
            listar até o terceiro (se existir)

        mais de 3 curtidas (incluindo o user)
            eu curti / eu não curti
            listar até o terceiro (se existir)
            mostrar a quantidade dos demais likes
        */
    
        let tooltipString = "";

        const likesAuthors = likes.map(like => {
            return ("user.username" in like) ? like["user.username"] : like.username
        });

        if (userLiked) {
            tooltipString = "Você"

            let index = 0;
            let addedNames = 1;
            do {
                if (likesAuthors[index] !== user.username) {
                    tooltipString += addedNames <= 1 ? `, ${likesAuthors[index]} ` : `e ${likesAuthors[index]}`;
                    addedNames++;
                }
                index++;
            } while (addedNames <= 2 || index === likesAuthors.length);

        }else{
            for (let i = 0; i <= 2; i++) {
                tooltipString += index < 2 ? `${likesAuthors[index]}, ` : `e ${likesAuthors[index]}`;
            }
        }


        tooltipString += likesAuthors.length > 3 ?  ' curtiram esse post' : ' curtiu esse post';

        console.log(tooltipString, index, info.likes);
        setPeopleLikes(tooltipString);
    }









    function handleLike () {
        const userLiked = likes.filter((item) => item.userId === user.id).length;

        if (userLiked === 0) {
            const promise = LikePost(info.id)
            promise
                .then(res => {
                    console.log('aqui', likes, res.data);
                    setLikes(res.data.post.likes)
                })
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
                <AiFillHeart onClick={handleLike}>{userLiked ? 'dislike': 'like'}</AiFillHeart>
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