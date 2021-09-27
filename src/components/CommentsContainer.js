import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { getComments, getFollowedUsers, sendComment } from "./Api";
import { FiSend } from "react-icons/fi";

export default function CommentsContainer ({info, index, commentsOpen}) {

    const history = useHistory();

    const [postComments, setPostComments] = useState([]);
    const [avatar,setAvatar] = useState('');
    const [commentWrote, setCommentWrote] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const [followedUsers,setFollowedUsers] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("auth")) {
            alert("Faça login antes!");
            history.push("/");
            return;
        }
        
        getComments(info.id)
        .then(res => setPostComments(res.data.comments))
        .catch(err => console.log(err))

        setAvatar( JSON.parse(localStorage.getItem('user')).avatar );

        getFollowedUsers()
        .then((res) => setFollowedUsers(res.data.users))
        .catch((err) =>
            alert("Houve uma falha ao obter os usuários que você segue, por favor atualize a página")
        );

    }, []);

    function publishComment (event) {

        event.preventDefault();

        if ( commentWrote === '' || commentWrote === null ) {
            alert("Por favor preencha o comentário que queira compartilhar")
            return
        }

        const promise = sendComment(info.id,{"text":commentWrote})
        promise
            .then(res => history.go(0))
            .catch(err => {
                setIsPublishing(false)
                alert("Houve um erro ao publicar seu comentário")
                alert(err.request.response.message)
            });
        setIsPublishing(true);
    }

    return (
        <>
        {commentsOpen ? 
            <CommentsBox>
                <ul>
                    <li>
                        {postComments.map( ({text, user}) => <>
                        <CommentBox>
                            <Link to={"/user/" + user.id}>
                                <UserAvatar src={user.avatar} />
                            </Link>
                            <InfoBox>
                                <h3>
                                    {user.username} 
                                    {user.id == info.user.id ? <span> • post’s author</span> : null} 
                                    {followedUsers.includes(user) ? <span> • following</span> : null}
                                </h3>
                                <h5>
                                    {text}
                                </h5>
                            </InfoBox>
                        </CommentBox>
                        <Line/>
                        </>
                        )}
                    </li>
                    <li>
                        <NewCommentBox>
                            <UserAvatar src={avatar} />
                            <form onSubmit={publishComment}>
                                <CommentInput 
                                    type="text" 
                                    name="comment" 
                                    placeholder="write a comment..." 
                                    onChange={(e) => setCommentWrote(e.target.value)} 
                                    value={commentWrote} 
                                    required disabled={isPublishing}
                                />
                                <IconBox onClick={publishComment}>
                                    <FiSend size="1.2em"/>
                                </IconBox>   
                            </form>
                        </NewCommentBox>
                    </li>
                </ul>
            </CommentsBox> 
         : null } 
        </>
    )
}

const CommentsBox = styled.div`
    width: 100%;
    max-height: 300px;
    overflow: scroll;
    margin-top: -20px;
    margin-bottom: 20px;
    padding-top: 0px;
    z-index: -1;
    display: flex;
    flex-direction: column;
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    background: #1E1E1E;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    border: none;
    ul {
        padding: 20px;
    }
`;

const CommentBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const UserAvatar = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 304px;
    margin-right: 18px;
`;

const NewCommentBox = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
`;

const CommentInput = styled.input`
    width: 510px;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    border: none;
    padding-left: 10px;
    font-family: Lato;
    font-style: normal;
    color: #FFFFFF;
    font-size: 16px;
    word-break: break-all;
            :disabled {
                background-color: grey;
            }
            ::placeholder {
                font-style: italic;
                font-weight: normal;
                font-size: 14px;
                letter-spacing: 0.05em;
                color: #575757;
                }
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    font-family: Lato;
    font-style: normal;
    h3 {
        font-weight: bold;
        font-size: 14px;
        color: #F3F3F3;
        word-break: break-word;
        span{
            font-weight: normal;
            font-size: 14px;
            color: #565656;
        }
    }
    h5 {
        font-weight: normal;
        font-size: 14px;
        color: #ACACAC;
        word-break: break-word;
    }
`;

const Line = styled.div`
  width: 100%;
  height: 0px;
  border: 1px solid #353535;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const IconBox = styled.div`
    position: absolute;
    top: 10px;
    right: 30px;
    color: #F3F3F3;
`;